const { Utils } = require("../utils");

exports.Post341 = class Post341 extends Utils {

    newPostTitle = "";
    listElements = 'li.gh-list-row.gh-posts-list-item';
    statusFilter = 'div.gh-contentfilter-menu.gh-contentfilter-type';

    pathFile = process.env.RESULT_IMAGES_PATH;
    waitTime = process.env.WAIT_TIME;

    constructor(page) {
        super(page);
        this.page = page;
        this.postsLink = page.getByRole('link', { name: 'Posts' });
        this.postNew = page.locator('a:has-text("New post")');
        this.postTitle = page.locator('[placeholder="Post Title"]');
        this.postTitleConfirm = page.locator('css=div.koenig-editor__editor.__mobiledoc-editor.__has-no-content');
        this.postsBack = page.locator('a:has-text("Posts")');
        this.pagePostFilter = page.locator(this.statusFilter);
        this.pagePostFilterAll = page.getByText('All posts', { exact: true });
        this.pagePostFilterDraft = page.getByText('Draft posts');
        this.postPublishButton = page.getByRole('button', { name: 'Publish' });
        this.postPublishConfirm = page.getByRole('button', { name: 'Publish', exact: true });
        this.pagePostFilterPublished = page.getByText('Published posts');
        this.pagePostScheduleCheck = page.locator('div:nth-child(2) > .gh-publishmenu-radio-button');
        this.pagePostScheduleConfirm = page.getByRole('button', { name: 'Schedule', exact: true });
        this.pagePostFilterScheduled = page.getByText('Scheduled posts');
        this.postSettingsButton = page.getByRole('button', { name: 'Settings' });
        this.postSettingsDeleteButton = page.getByRole('button', { name: 'Delete post' });
        this.postSettingsDeleteButtonConfirm = page.getByRole('button', { name: 'Delete', exact: true });
        this.postSettingsCancelButton = page.getByRole('button', { name: 'Cancel' });
        this.postUpdateButton = page.getByRole('button', { name: 'Update' });
        this.postUpdateUnPublishOption = page.locator('.gh-publishmenu-radio-button');
        this.postUpdateUnPublishConfirm = page.getByRole('button', { name: 'Unpublish', exact: true });
        this.postScheduledButton = page.getByRole('button', { name: 'Scheduled' });
        this.postUnPublishConfirm = page.getByRole('button', { name: 'Unschedule', exact: true });
        this.pagePostTitlePublishError = page.getByRole('button').filter({ hasText: '.close-stroke_svg__a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-l' })
        this.pagePostScheduleHourError = page.locator('input[type="text"]').nth(1);
        this.pagePostScheduleDayError = page.locator('input[type="text"]').nth(0);
        this.pagePostSettingsHourError = page.locator('input[type="text"]').nth(2);
        this.pagePostSettingsDayError = page.locator('input[type="text"]').nth(1);
        this.pagePostSettingsConfirmError = page.getByText('Publish date');
    }

    async draftPost() {
        await this.waitPlease();
        await this.pagePostFilter.click();
        await this.waitPlease();
        await this.pagePostFilterDraft.click();
        await this.waitPlease();
        return await this.page.$$(this.listElements);
    }

    async publishedPost() {
        await this.waitPlease();
        await this.pagePostFilter.click();
        await this.waitPlease();
        await this.pagePostFilterPublished.click();
        await this.waitPlease();
        return await this.page.$$(this.listElements);
    }

    async scheduledPost() {
        await this.waitPlease();
        await this.pagePostFilter.click();
        await this.waitPlease();
        await this.pagePostFilterScheduled.click();
        await this.waitPlease();
        return await this.page.$$(this.listElements);
    }

    async selectAllPosts() {
        await this.waitPlease();
        await this.pagePostFilter.click()
        await this.waitPlease();
        await this.pagePostFilterAll.click();
    }

    async createPost(esc, i) {
        await this.postNew.first().click();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_vacio.png');
        this.newPostTitle = await this.getNewTitle();
        await this.postTitle.fill(this.newPostTitle);
        await this.postTitleConfirm.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_diligenciado.png');
    }
    
    async backPost(esc, i) {
        await this.postsBack.first().click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_listado_posts.png');
    }

    async publishPost(esc, i) {
        await this.postPublishButton.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_publish_menu.png');

        await this.postPublishConfirm.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_publish_confirm.png');
    }

    async schedulePost(esc, i) {
        await this.postPublishButton.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_publish_menu.png');

        await this.pagePostScheduleCheck.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_publish_schedule_select.png');

        await this.pagePostScheduleConfirm.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_publish_schedule_confirm.png');
    }
}