
const data ={
    layout: null,
    permalink: '/dynamic_style/flm.css',
};

const render = async () => {

    const zooflm = await import('@phfaist/zoodb/zooflm');

    const fr = new zooflm.ZooHtmlFragmentRenderer();

    const flm_style = zooflm.html_fragmentrenderer_get_style_information( fr );

    return `
/* FLM stylesheet - global definitions */
${ flm_style.css_global }
/* FLM stylesheet - contents definitions */
${ flm_style.css_content }
`;

};

module.exports = { data, render, };
