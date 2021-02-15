import React from 'react';
import './Header.scss';
import { Container, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/instaclone.png';
import RightHeader from './RightHeader';

const Header = () => {
    return (
        <div className="header">
            <Container>
                <Grid>
                    <Grid.Column width={3} className="header__logo">
                        <Link to="/">
                            <Image src={Logo} alt="Instaclone" />
                        </Link>
                    </Grid.Column>
                    <Grid.Column width={10} >
                        <p>Buscador</p>
                    </Grid.Column>
                    <Grid.Column width={3} >
                        <RightHeader>

                        </RightHeader>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}

export default Header;
