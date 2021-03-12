import React from 'react';
import { Image } from 'semantic-ui-react';
import './PreviewPublication.scss';

const PreviewPublication = (props) => {

    const { publication } = props;

    return (
        <>
            <div className="preview-publication" >
                <Image className="preview-publication__image" src={publication.file} />
            </div>
        </>
    )
}

export default PreviewPublication;
