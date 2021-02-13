import React from 'react';
import { Container } from 'semantic-ui-react';

const LayoutBasic = (props) => {

    const { children } = props;

    return (
        <>
            <h1>Header</h1>
            <Container className="layout-basic">
                {children}
            </Container>
        </>
    )
}

export default LayoutBasic;
