import React from 'react';

function Image(props) {
    const longSide = parseInt(props.width, 10) > parseInt(props.height, 10) ? parseInt(props.width, 10) : parseInt(props.height, 10);
    const scale = 200 / longSide;
    const tWidth = parseInt(props.width, 10) * scale;
    const tHeight = parseInt(props.height, 10) * scale;
    return (
        <tr>
            <td><img src={props.url} alt={props.caption} className="img-thumbnail" width={tWidth} height={tHeight}/></td>
            <td>
                <h4>{props.caption}</h4>
                <p><strong>URL: </strong>{props.url}</p>
                <p><strong>Markdown: </strong>![{props.caption}]({props.url.replace(/ /g, '%20')})</p>
                <p><strong>Original Size:</strong> {props.width} x {props.height} <em>(Displayed Size: {tWidth.toPrecision(3)} x {tHeight.toPrecision(3)})</em></p>
            </td>
        </tr>
        );
}

export default Image;