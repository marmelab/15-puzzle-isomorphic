import React, { Component } from 'react';

import Button from '../src/components/button';
import FloatingButton from '../src/components/floatingButton';
import Image from '../src/components/image';
import Page from '../src/components/page';
import Row from '../src/components/row';
import Section from '../src/components/section';
import { ShowWhenOnline } from '../src/components/detectOffline';

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
                    <li>
                        <Button
                            className="btn-floating"
                            color="green"
                            icon="person"
                            label="Single game"
                            route="game"
                        />
                    </li>
                    <ShowWhenOnline>
                        <li>
                            <Button
                                className="btn-floating"
                                color="blue"
                                icon="people"
                                label="Multiplayer mode"
                                route="multiplayer_games"
                            />
                        </li>
                    </ShowWhenOnline>
                </FloatingButton>
            </Page>
        );
    }
}
