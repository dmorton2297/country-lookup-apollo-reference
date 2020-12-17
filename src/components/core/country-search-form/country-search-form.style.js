import styled from 'styled-components';
import { Field } from 'formik';


export const FormContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const TextInput = styled(Field)`
    height: 50px;
`;
