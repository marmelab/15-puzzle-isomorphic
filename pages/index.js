import React, { Component } from 'react';

import Bloc from '../src/components/bloc';
import Button from '../src/components/button';
import Image from '../src/components/image';
import Page from '../src/components/page';
import Row from '../src/components/row';
import Section from '../src/components/section';

export default class Index extends Component {
    render() {
        return (
            <Page>
                <Section>
                    <Bloc title="Welcome to the 15 puzzle game!">
                        <Image
                            src="/static/images/banner.jpg"
                            alt="15 puzzle picture"
                        />
                    </Bloc>
                    <Row>
                        <div className="buttons-wrapper">
                            <Button
                                color="blue"
                                icon="play_circle_outline"
                                label="Single game"
                                route="game"
                            />
                            <Button
                                color="blue"
                                icon="play_circle_outline"
                                label="Multiplayer game"
                                route="multiplayer_games"
                            />
                        </div>
                    </Row>
                </Section>
            </Page>
        );
    }
}
