import React, { Component } from 'react';

import Page from '../src/components/layout/Page';
import Row from '../src/components/layout/Row';
import Section from '../src/components/layout/Section';

import Button from '../src/components/ui/Button';
import FloatingButton from '../src/components/ui/FloatingButton';
import FloatingButtonFab from '../src/components/ui/FloatingButtonFab';
import Image from '../src/components/ui/Image';

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
                <FloatingButton icon="add">
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
