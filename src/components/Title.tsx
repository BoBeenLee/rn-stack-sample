import React, { SFC } from 'react';
import styled from 'styled-components/native';

interface IProps {
    title: string;
}

const Container = styled.Text``;

const Title: SFC<IProps> = ({ title }) => {
    return (
        <Container>
            {title}
        </Container>
    );
};

export default Title;
