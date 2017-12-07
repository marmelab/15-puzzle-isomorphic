import React, { Component } from 'react';

import Button from '../src/components/Button';
import FloatingButton from '../src/components/FloatingButton';
import FloatingButtonFab from '../src/components/FloatingButtonFab';
import Image from '../src/components/Image';
import Page from '../src/components/Page';
import Row from '../src/components/Row';
import Section from '../src/components/Section';

export default class Index extends Component {
    render() {
        return (
            <Page>
                <Section>
                    <Row>
                        <Image
                            className="center"
                            src="/static/images/banner.jpg"
                            alt="15 puzzle picture"
                        />
                    </Row>
                </Section>
                <FloatingButton icon="play_circle_outline">
                    <FloatingButtonFab>
                        <Button
                            className="btn-floating"
                            color="green"
                            icon="person"
                            label="Single game"
                            route="game"
                        />
                    </FloatingButtonFab>
                    <FloatingButtonFab showOnlyIfOnline={true}>
                        <Button
                            className="btn-floating"
                            color="blue"
                            icon="people"
                            label="Multiplayer mode"
                            route="multiplayer_games"
                        />
                    </FloatingButtonFab>
                </FloatingButton>
            </Page>
        );
    }
}
