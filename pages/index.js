import React, { Component } from 'react';

import Block from '../src/components/block';
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
                    <Block>
                        <Image
                            className="center"
                            src="/static/images/banner.jpg"
                            alt="15 puzzle picture"
                        />
                        <div className="center">
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
                    </Block>
                </Section>
            </Page>
        );
    }
}
