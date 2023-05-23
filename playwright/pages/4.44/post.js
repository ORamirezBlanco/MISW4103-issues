const { Post341 } = require("../3.41/post");

exports.Post444 = class Post444 extends Post341 {

    constructor(page) {
        super(page);
        this.page = page;
        this.postsLink = page.getByRole('link', { name: 'Posts', exact: true });
        this.postTitle = page.locator('[placeholder="Post title"]');

        this.postPublishConfirmReady = page.locator('button:has-text("Publish")'); 
        this.postPublishScheduleConfirmReady = page.locator('button:has-text("Schedule")'); 

    }

    async publishPost(esc, i) {
        await this.postPublishButton.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_publish_menu.png');

        await this.postPublishConfirm.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i) + '-post_crear_publish_confirm.png');

        await this.postPublishConfirmReady.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_publish_confirm_2_ready.png');
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
        await this.screenshot(this.pathFile, esc + await this.add_cero(i) + '-post_crear_publish_schedule_confirm.png');
        
        await this.postPublishScheduleConfirmReady.click();
        await this.waitPlease();
        await this.screenshot(this.pathFile, esc + await this.add_cero(i++) + '-post_crear_publish_schedule_confirm_2_ready.png');
    }
}