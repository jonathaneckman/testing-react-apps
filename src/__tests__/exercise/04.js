// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
const { build, fake } = require('@jackfranklin/test-data-bot');

const loginFormBuilder = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
});

test('submitting the form calls onSubmit with username and password', async () => {

  const {username, password} = loginFormBuilder({
    overrides: {
      password: '123'
    }
  })

  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', {name: /submit/i})

  await userEvent.type(usernameField, username)
  await userEvent.type(passwordField, password)
  await userEvent.click(submitButton)
  
  expect(handleSubmit).toBeCalledWith({
    username: username,
    password: password
  })
})

/*
eslint
  no-unused-vars: "off",
*/
