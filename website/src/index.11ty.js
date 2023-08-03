
const data = {
    title: "People DB home",
    tags: [ 'allPages' ],
    eleventyComputed: {
        // ---
        // injection hack to get correct page date property!
        // https://github.com/11ty/eleventy/issues/2199#issuecomment-1027362151
        date: (data) => {
            data.page.date = new Date(
                data.zoodb.zoo_gitlastmodified_processor.get_latest_modification_date()
            );
            return data.page.date;
        }
        // ---
    }
};

const render = async function (data)
{
    const eleventy = this;
    const zoodb = data.zoodb;

    const { render_html_standalone } = await import('@phfaist/zoodb/zooflm');

    let content = `
<p>List of people:</p>`;

    content += `
<ul>`;

    const person_id_list = [ ...Object.keys(zoodb.objects.person) ];
    person_id_list.sort();

    for (const person_id of person_id_list) {
        // If we'd like to render other properties of `person`, especial FLM
        // content that is not marked as standalone-mode compatible, we should
        // use `zooflm.make_and_render_document` with a render callback.

        const person = zoodb.objects.person[person_id];
        const personHrefUrl = eleventy.hrefUrl(
            zoodb.zoo_object_permalink('person', person_id)
        );
        const personName = render_html_standalone(zoodb.objects.person[person_id].name);

        content += `
<li><a href="${ personHrefUrl }">${ personName }</a></li>
`;
    }

    content += `
</ul>
`;
    return content;
};


module.exports = { data, render, };
