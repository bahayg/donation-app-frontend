import React, { Component } from 'react';
import { Image, Segment, Grid, Header, List, Container, Divider } from 'semantic-ui-react';
import { getByTitle } from '@testing-library/react';

class Footer extends Component{

    render() {
        return(
            <Segment inverted style={{ margin: '5em 0em 0em', padding: '2em 0em 2em 0em' }} vertical>
          <Container textAlign='center'>
            <Grid columns={3} divided stackable inverted>
              <Grid.Row height="1">

                <Grid.Column width="4">
                  <Header inverted as='h4' content='Links' />
                  <List link inverted>
                    <List.Item as='a' href='/signup'>Sign Up</List.Item>
                    <List.Item as='a' href='/login'>Log In</List.Item>
                  </List>
                </Grid.Column>

                <Grid.Column width="7">
                  <Header inverted as='h4' content='Thank you for supporting Reunited Hands!' />
                      <List link inverted>
                    <List.Item as='a' href='/login'>Donate Now!</List.Item>
                  </List>
                </Grid.Column>

                <Grid.Column width="4">
                  <Header inverted as='h4' content='Links' />
                  <List link inverted>
                    <List.Item as='a' href='https://www.linkedin.com/in/bahay-gulle-bilgi/'>LinkedIn</List.Item>
                    <List.Item as='a' href='https://github.com/bahayg'>GitHub</List.Item>
                    <List.Item as='a' href='https://medium.com/@bahayg '>Articles</List.Item>
                  </List>
                </Grid.Column>

              </Grid.Row>

            </Grid>

            <Divider inverted section />
            <Image src='/DonationIcon2.png' centered size='mini' />
            <List horizontal inverted divided link size='small'>
              <List.Item>
                © 2020 Reunited Hands by Bahay Gulle Bilgi. All rights reserved.
              </List.Item>
            </List>
          </Container>
        </Segment>
    ) }
}

export default Footer