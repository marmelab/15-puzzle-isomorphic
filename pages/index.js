import React, { Component } from 'react';

import Bloc from '../src/components/bloc';
import Button from '../src/components/button';
import { ShowWhenOnline } from '../src/components/detectOffline';
import Image from '../src/components/image';
import Page from '../src/components/page';
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
                        <div>
                            <Button
                                color="green"
                                icon="play_circle_outline"
                                label="Single game"
                                route="game"
                            />
                            <ShowWhenOnline>
                                <Button
                                    color="blue"
                                    icon="play_circle_outline"
                                    label="Multiplayer mode"
                                    route="multiplayer_games"
                                />
                            </ShowWhenOnline>
                        </div>
                    </Bloc>
                </Section>
            </Page>
        );
    }
}
