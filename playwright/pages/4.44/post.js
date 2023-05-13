const { Utils } = require("../utils");

exports.Post444 = class Post444 extends Utils {

    newPostTitle = "Relojes";
    newPostContent = "Relojes content";
    listElements = 'li.gh-list-row.gh-posts-list-item';
    statusFilter = 'div.gh-contentfilter-menu.gh-contentfilter-type';

    pathFile = process.env.RESULT_IMAGES_PATH;
    waitTime = process.env.WAIT_TIME;

    constructor(page) {
        super(page);
        this.page = page;
        this.postsLink = page.getByRole('link', { name: 'Posts', exact: true });
        this.postNew = page.locator('a:has-text("New post")');
        this.postTitle = page.locator('[placeholder="Post title"]');
        this.postTitleConfirm = page.locator('css=div.koenig-editor__editor.__mobiledoc-editor.__has-no-content');
        this.postsBack = page.locator('a:has-text("Posts")');
        this.pagePostFilter = page.locator(this.statusFilter);
        this.pagePostFilterAll = page.getByText('All posts', { exact: true });
        this.pagePostFilterDraft = page.getByText('Draft posts');
        this.postPublishButton = page.getByRole('button', { name: 'Publish' });
        this.postPublishConfirm = page.getByRole('button', { name: 'Publish', exact: true });
        
        
        this.postPublishConfirmReady = page.locator('button:has-text("Publish")'); 
        this.postPublishScheduleConfirmReady = page.locator('button:has-text("Schedule")'); 

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
    }

    async draftPost() {
        await this.waitPlease(this.waitTime);
        await this.pagePostFilter.click();
        await this.waitPlease(this.waitTime);
        await this.pagePostFilterDraft.click();
        await this.waitPlease(this.waitTime);
        return await this.page.$$(this.listElements);
    }

    async publishedPost() {
        await this.waitPlease(this.waitTime);
        await this.pagePostFilter.click();
        await this.waitPlease(this.waitTime);
        await this.pagePostFilterPublished.click();
        await this.waitPlease(this.waitTime);
        return await this.page.$$(this.listElements);
    }

    async scheduledPost() {
        await this.waitPlease(this.waitTime);
        await this.pagePostFilter.click();
        await this.waitPlease(this.waitTime);
        await this.pagePostFilterScheduled.click();
        await this.waitPlease(this.waitTime);
        return await this.page.$$(this.listElements);
    }

    async selectAllPosts() {
        await this.waitPlease(this.waitTime);
        await this.pagePostFilter.click()
        await this.waitPlease(this.waitTime);
        await this.pagePostFilterAll.click();
    }

    async createPost(esc, i) {
        await this.postNew.first().click();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_vacio.png');

        await this.postTitle.fill(this.newPostTitle);
        await this.postTitleConfirm.click();
        await this.waitPlease(this.waitTime);
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_diligenciado.png');
    }
    
    async backPost(esc, i) {
        await this.postsBack.first().click();
        await this.waitPlease(this.waitTime);
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_listado_posts.png');
    }

    async publishPost(esc, i) {
        await this.postPublishButton.click();
        await this.waitPlease(this.waitTime);
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_publish_menu.png');

        await this.postPublishConfirm.click();
        await this.waitPlease(this.waitTime);
        await this.screenshot(this.pathFile, esc + await this.add_cero(i) + '-post_crear_publish_confirm.png');

        await this.postPublishConfirmReady.click();
        await this.waitPlease(this.waitTime);
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_publish_confirm_2_ready.png');
    }

    async schedulePost(esc, i) {
        await this.postPublishButton.click();
        await this.waitPlease(this.waitTime);
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_publish_menu.png');

        await this.pagePostScheduleCheck.click();
        await this.waitPlease(this.waitTime);
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_publish_schedule_select.png');

        await this.pagePostScheduleConfirm.click();
        await this.waitPlease(100);
        await this.screenshot(this.pathFile, esc + await this.add_cero(i) + '-post_crear_publish_schedule_confirm.png');
        
        await this.postPublishScheduleConfirmReady.click();
        await this.waitPlease(this.waitTime);
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_publish_schedule_confirm_2_ready.png');
    }
}