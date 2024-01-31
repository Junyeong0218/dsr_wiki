const officialUpdateLink = "https://www.digimonsuperrumble.com/Update/List";

const getOfficialNotices = async () => {
    fetch(officialUpdateLink).then(async (response) => {
        const html = await response.text();
        console.log(html);

        const regex = /<div class="list_wrap">/g;
    }).catch(error => {
        console.log(error);
    });
}

export {
    getOfficialNotices
}