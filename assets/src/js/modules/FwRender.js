import FwResolver from './FwResolver';
import { fotowareConfig } from "../utils/constants";

class FwRender {
    constructor(resolver) {
        this.resolver = resolver;

        this.$content = '';
        this.$container = '';
    }

    createWPmodal() {
        if (window.tb_show) {
            window.tb_show('FotoWare', '*fakeurl*', () => console.log('opened'));
            this.$content = $('#TB_ajaxContent');
            this.$container = $('#TB_window').addClass('fw-modal');
        }
    }

    assetInsert(ev, data) {
        const previewUrl = data.previews[0].href;
        const img = `<p><img class="alignnone" src="${fotowareConfig.baseUrl}${previewUrl}" /></p>`;

        if (window.wp) {
            window.wp.media.editor.insert(img)
        }
    }

    setContainerState($container, isLoading) {
        isLoading ? $container.addClass('loading') : $container.removeClass('loading')
    }

    backBtnRender = () => {
        const $backBtn = $(`<a href="#" class="back-btn">< — Back</a>`);
        $backBtn.on('click', this.archiveReRenderClickHandler.bind(this));

        this.$content.append($backBtn)
    };

    searchRender = () => {
        const $searchContainer = $(`<div class="search-container"></div>`);
        const $input = $(`<input type="search" placeholder="search" data-href="${this.archiveEndpoint}" />`);

        $searchContainer.append($input);
        $input.on('change', ev => this.assetsReRenderSearchHandler(ev));

        this.$content.append($searchContainer);
    };

    assetsPagingRender = paging => {
        const $toFirstBtn = $(`<button class="to-first" data-href="${paging.first}">first</button>`);
        const $toLastBtn = $(`<button class="to-last" data-href="${paging.last}">last</button>`);
        const $toNextBtn = $(`<button class="to-next" data-href="${paging.next}">next</button>`);
        const $toPrevBtn = $(`<button class="to-prev" data-href="${paging.prev}">prev</button>`);
        const $pagingContainer = $(`<div class="paging-container"></div>`);

        $pagingContainer.append($toFirstBtn);
        if (paging.prev) {
            $pagingContainer.append($toPrevBtn)
        }
        if (paging.next) {
            $pagingContainer.append($toNextBtn)
        }
        $pagingContainer.append($toLastBtn);
        $pagingContainer.children().map((i, btn) => $(btn).on('click', ev => this.assetsReRenderNavigationHandler(ev)));

        this.$content.append($pagingContainer)
    };

    assetsResultsRender = assets => {
        const $assetItems = assets.map(asset => {
            const $assetContainer = $(`
                <div class="fotoware-item asset">
                    <div class="thumbnail-container">
                        <img src="${fotowareConfig.baseUrl}${asset.previews[asset.previews.length - 2].href}" alt="" name="${asset.filename}">
                    </div>
                    <div class="text-container">${asset.filename}</div>
                </div>`);

            $assetContainer.on('click', ev => this.assetInsert(ev, asset));

            return $assetContainer
        });

        this.$content.append($assetItems);
    };

    archiveResultsRender = archives => {
        const $archiveItems = archives.map(archive => {
            const $itemContainer = $(`
                <div class="fotoware-item archive" data-href="${archive.originalURL}">
                    <div class="text-container">
                        ${archive.name}                    
                    </div>
                </div>`);

            $itemContainer.on('click', ev => this.assetsReRenderClickHandler(ev));

            return $itemContainer
        });

        this.$content.append($archiveItems);
    };

    assetsPageRender = (data, paging) => {
        if (data) {
            this.$content.empty();

            this.backBtnRender();
            this.searchRender();
            this.assetsResultsRender(data);
            this.assetsPagingRender(paging);
        } else {
            throw new ReferenceError('Server connection issue. Please, try again')
        }
    };

    requestHandler(requestFunc, ev, renderFunc) {
        this.setContainerState(this.$content, true);

        requestFunc(ev)
            .then(res => {
                const { data, paging } = res.data;

                this.setContainerState(this.$content, false);
                renderFunc(data, paging);
            })
            .catch(err => {
                this.setContainerState(this.$content, false);

                console.log(err)
            })
    }

    assetsReRenderNavigationHandler(ev) {
        this.requestHandler(this.resolver.assetsNavigationHandler, ev, this.assetsPageRender);
    }

    assetsReRenderSearchHandler(ev) {
        this.requestHandler(this.resolver.assetsSearchHandler, ev, this.assetsPageRender);
    }

    assetsReRenderClickHandler(ev) {
        this.archiveEndpoint = $(ev.target).data('href');
        this.requestHandler(this.resolver.assetsRequestHandler, ev, this.assetsPageRender);
    }

    archiveReRenderClickHandler(ev) {
        this.$content.empty();
        this.requestHandler(this.resolver.archiveRequestHandler, ev, this.archiveResultsRender)
    }

    handleClick = () => {
        this.createWPmodal();

        if (this.$container) {
            this.archiveReRenderClickHandler()
        }
    };

    init() {
        const $btns = $('.fotoweb-btn');

        $btns.on('click', this.handleClick)
    }
}

export default new FwRender(new FwResolver());