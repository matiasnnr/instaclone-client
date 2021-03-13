import React from 'react';
import { Modal, Grid } from 'semantic-ui-react';
import Action from './Action/Action';
import CommentForm from './CommentForm';
import Comments from './Comments/Comments';
import './ModalPublication.scss';

const ModalPublication = (props) => {

    const { show, setShow, publication } = props;

    const onClose = () => setShow(false);

    return (
        <Modal open={show} onClose={onClose} className="modal-publication" >
            <Grid>
                <Grid.Column
                    className="modal-publication__left"
                    width={10}
                    style={{ backgroundImage: `url("${publication.file}")` }}
                />

                <Grid.Column className="modal-publication__right" width={6} >
                    <Comments publication={publication} />
                    <Action publication={publication} />
                    <CommentForm publication={publication} />
                </Grid.Column>
            </Grid>
        </Modal>
    )
}

export default ModalPublication;
