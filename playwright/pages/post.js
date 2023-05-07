const { UtilsPage } = require("./utils");

exports.PostPage = class PostPage extends UtilsPage {

    newPostTitle = "Relojes";
    newPostContent = "Relojes content";
    pathFile = './results/post/';
    listElements = 'li.gh-list-row.gh-posts-list-item';

    statusFilter = 'div.gh-contentfilter-menu.gh-contentfilter-type';
    

    constructor(page) {
        super(page);
        this.page = page;
        this.postsLink = page.getByRole('link', { name: 'Posts' });
        this.postNew = page.locator('a:has-text("New post")');
        this.postTitle = page.locator('[placeholder="Post Title"]');
        this.postTitleConfirm = page.locator('css=div.koenig-editor__editor.__mobiledoc-editor.__has-no-content');
        this.postsBack = page.locator('a:has-text("Posts")');
        // this.pagePostFilter = page.getByRole('button', { name: 'All posts' });
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
        this.postSettingsConfirmButton = page.getByRole('button', { name: 'Delete', exact: true });
        this.postSettingsCancelButton = page.getByRole('button', { name: 'Cancel' });

        this.postUpdateButton =   page.getByRole('button', { name: 'Update' });
        this.postUpdateUnPublishOption = page.locator('.gh-publishmenu-radio-button');
        this.postUpdateUnPublishConfirm = page.getByRole('button', { name: 'Unpublish', exact: true });
        
        this.postScheduledButton = page.getByRole('button', { name: 'Scheduled' });
        this.postUnPublishConfirm = page.getByRole('button', { name: 'Unschedule', exact: true });


        
    }

    async draftPost( ) {
        await this.pagePostFilter.click();
        await this.pagePostFilterDraft.click();
        await this.waitPlease(500);
        return await this.page.$$(this.listElements);
    }

    async publishedPost( ) {
        await this.pagePostFilter.click();
        await this.pagePostFilterPublished.click();
        await this.waitPlease(500);
        return await this.page.$$(this.listElements);
    }

    async scheduledPost( ) {
        await this.pagePostFilter.click();
        await this.pagePostFilterScheduled.click();
        await this.waitPlease(500);
        return await this.page.$$(this.listElements);
    }

    async selectAllPosts(){
        await this.pagePostFilter.click()
        await this.pagePostFilterAll.click();
    }

}