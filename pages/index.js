import React, { Component } from 'react';

import Bloc from '../src/components/bloc';
import Button from '../src/components/button';
import Image from '../src/components/image';
import Page from '../src/components/page';
import Row from '../src/components/row';
import Section from '../src/components/section';

export default class Index extends Component {
    handleClickSingleGame = () => {};

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
                </Section>
                <Section>
                    <Row>
                        <Button
                            color="blue"
                            icon="play_circle_outline"
                            label="Single game"
                            path="/game"
                        />
                    </Row>
                </Section>
            </Page>
        );
    }
}
