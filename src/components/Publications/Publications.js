import React from 'react';
import { Grid } from 'semantic-ui-react';
import { map } from 'lodash';
import PreviewPublication from './PreviewPublication';
import './Publications.scss';

const Publications = (props) => {

    const { getPublications } = props;

    return (
        <div className="publications">
            <h1>Publicaciones</h1>
            <Grid
                doubling // responsive
                columns={4} // cada linea de publicaciones tendrá 4 imágenes
            >
                {map(getPublications, (publication, index) => (
                    <Grid.Column
                        key={index}
                    >
                        <PreviewPublication publication={publication} />
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    )
}

export default Publications;
