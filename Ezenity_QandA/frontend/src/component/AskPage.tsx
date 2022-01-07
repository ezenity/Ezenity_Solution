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
  FieldError,
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
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
  });
  return (
    <Page title="Ask a question">
      <form>
        <Fieldset>
          <FieldContainer>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <FieldInput
              id="title"
              // name="title"
              type="text"
              {...register('title', { required: true, minLength: 10 })}
            ></FieldInput>
            {errors.title && errors.title.type === 'required' && (
              <FieldError>You must enter the question title.</FieldError>
            )}
            {errors.title && errors.title.type === 'minLength' && (
              <FieldError>
                The title must be at least 10 characters long.
              </FieldError>
            )}
          </FieldContainer>
          <FieldContainer>
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <FieldTextArea
              id="content"
              // name="content"
              {...register('content', { required: true, minLength: 50 })}
            ></FieldTextArea>
            {errors.content && errors.content.type === 'require' && (
              <FieldError>You must enter the question content.</FieldError>
            )}
            {errors.content && errors.content.type === 'minLength' && (
              <FieldError>
                The content must be at least 50 characters long.
              </FieldError>
            )}
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
