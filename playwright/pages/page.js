const { Utils } = require("./utils");

exports.Page = class Page extends Utils {

    newPageTitle = "";
    listElements = 'li.gh-list-row.gh-posts-list-item';
    statusFilter = 'div.gh-contentfilter-menu.gh-contentfilter-type';

    pathFile = process.env.RESULT_IMAGES_PATH;
    waitTime = process.env.WAIT_TIME;

    constructor(page) {
        super(page);
        this.page = page;
        this.pagesLink = page.getByRole('link', { name: 'Pages' });
        this.pageNew = page.locator('a:has-text("New page")');
        this.pageTitle = page.locator('[placeholder="Page Title"]');
        this.pageTitleConfirm = page.locator('css=div.koenig-editor__editor.__mobiledoc-editor.__has-no-content');
        this.pagesBack = page.locator('a:has-text("Pages")');
        this.pagePageFilter = page.locator(this.statusFilter);
        this.pagePageFilterDraft = page.getByText('Draft pages');
        this.pagePublishButton = page.getByRole('button', { name: 'Publish' });
        this.pagePublishConfirm = page.getByRole('button', { name: 'Publish', exact: true });
        this.pagePageFilterPublished = page.getByRole('option', { name: 'Published pages', exact: true });
        this.pagePageScheduleCheck = page.locator('div:nth-child(2) > .gh-publishmenu-radio-button');
        this.pagePageScheduleConfirm = page.getByRole('button', { name: 'Schedule', exact: true });
        this.pagePageFilterScheduled = page.getByText('Scheduled pages');
        this.pageSettingsButton = page.getByRole('button', { name: 'Settings' });
        this.pageSettingsDeleteButton = page.getByRole('button', { name: 'Delete page' });
        this.pageSettingsDeleteButtonConfirm = page.getByRole('button', { name: 'Delete', exact: true });
        this.pageSettingsCancelButton = page.getByRole('button', { name: 'Cancel' });
        this.pagePageFilterAll = page.getByText('All pages', { exact: true });
        this.pageUpdateButton = page.getByRole('button', { name: 'Update' });
        this.pageUpdateUnPublishOption = page.locator('.gh-publishmenu-radio-button');
        this.pageUpdateUnPublishConfirm = page.getByRole('button', { name: 'Unpublish', exact: true });
        this.pageScheduledButton = page.getByRole('button', { name: 'Scheduled' });
        this.pageUnPublishConfirm = page.getByRole('button', { name: 'Unschedule', exact: true });
    
        this.pagePageTitlePublishError = page.getByRole('button').filter({ hasText: '.close-stroke_svg__a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-l' })
        this.pagePageScheduleHourError = page.locator('input[type="text"]').nth(1);
        this.pagePageScheduleDayError = page.locator('input[type="text"]').nth(0);
        this.pagePageSettingsHourError = page.locator('input[type="text"]').nth(2);
        this.pagePageSettingsDayError = page.locator('input[type="text"]').nth(1);
        this.pagePageSettingsConfirmError = page.getByText('Publish date');
   
    
    }

    async draftPages() {
        await this.waitPlease();
        await this.pagePageFilter.click();
        await this.waitPlease();
        await this.pagePageFilterDraft.click();
        await this.waitPlease();
        return await this.page.$$(this.listElements);
    }

    async publishedPages() {
        await this.waitPlease();
        await this.pagePageFilter.click();
        await this.waitPlease();
        await this.pagePageFilterPublished.click();
        await this.waitPlease();
        return await this.page.$$(this.listElements);
    }

    async scheduledPages() {
        await this.waitPlease();
        await this.pagePageFilter.click();
        await this.waitPlease();
        await this.pagePageFilterScheduled.click();
        await this.waitPlease();
        return await this.page.$$(this.listElements);
    }

    async selectAllPages() {
        await this.waitPlease();
        await this.pagePageFilter.click()
        await this.waitPlease();
        await this.pagePageFilterAll.click();
    }

    async createPage(esc, i) {
        await this.pageNew.first().click();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-page_crear_vacio.png');
        this.newPageTitle = await this.getNewTitle();
        await this.pageTitle.fill(this.newPageTitle);
        await this.pageTitleConfirm.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-page_crear_diligenciado.png');

    }

    async backPage(esc, i) {
        await this.pagesBack.first().click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-page_listado_pages.png');
    }

    async publishPage(esc, i) {
        await this.pagePublishButton.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-page_crear_publish_menu.png');

        await this.pagePublishConfirm.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-page_crear_publish_confirm.png');
    }

    async schedulePost(esc, i) {
        await this.pagePublishButton.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-page_crear_publish_menu.png');

        await this.pagePageScheduleCheck.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-page_crear_publish_schedule_select.png');

        await this.pagePageScheduleConfirm.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-page_crear_publish_schedule_confirm.png');
    }
}