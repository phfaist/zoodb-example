
import {
    ZooHtmlFragmentRenderer,
    html_fragmentrenderer_get_style_information
} from '@phfaist/zoodb/zooflm';


const data = {
    layout: null,
    permalink: '/dynamic_style/flm.css',
};

const render = async () => {

    const fr = new ZooHtmlFragmentRenderer();

    const flm_style = html_fragmentrenderer_get_style_information( fr );

    return `
/* FLM stylesheet - global definitions */
${ flm_style.css_global }
/* FLM stylesheet - contents definitions */
${ flm_style.css_content }
`;

};

export default { data, render, };
