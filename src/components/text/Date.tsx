import React from 'react';
import styled from "styled-components/native";

const Text = styled.Text`
    font-size: 12px;
    font-weight: 100;
`;

const Date = ({ children }) => {
    return (
        <Text>{children}</Text>
    );
};

export default Date;
