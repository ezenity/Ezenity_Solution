import React from 'react';
import { Page } from './Page';
import {
  Fieldset,
  FieldContainer,
  FieldLabel,
  FieldInput,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
} from '../assets/css/Styles';
import { useForm } from 'react-hook-form';

/**
 * Represents the form data
 */
type FormData = {
  title: string;
  content: string;
};

export const AskPage = () => {
  const { register } = useForm<FormData>();
  return (
    <Page title="Ask a question">
      <form>
        <Fieldset>
          <FieldContainer>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <FieldInput
              id="title"
              name="title"
              type="text"
              ref={register}
            ></FieldInput>
          </FieldContainer>
          <FieldContainer>
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <FieldTextArea
              id="content"
              name="content"
              ref={register}
            ></FieldTextArea>
          </FieldContainer>
          <FormButtonContainer>
            <PrimaryButton type="submit">Submit Your Question</PrimaryButton>
          </FormButtonContainer>
        </Fieldset>
      </form>
    </Page>
  );
};
export default AskPage;
