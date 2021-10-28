import React from 'react'
import { render } from 'react-dom'
import Form from 'react-jsonschema-form'
import { JSONSchema6 } from 'json-schema'

const jsonSchema: JSONSchema6 = {
  title: "Let's get started",
  description: '',
  type: 'object',
  required: ['firstName', 'lastName', 'email', 'password', 'passwordcheck'],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    email: {
      type: 'string',
      title: 'Email',
    },
    password: {
      type: 'string',
      title: 'Password',
      minLength: 6,
    },
    passwordcheck: {
      type: 'string',
      title: 'Password',
      minLength: 6,
    },
  },
}

const log = (type) => console.log.bind(console, type)

render(
  <Form schema={jsonSchema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')}>
    asdasdasd{' '}
  </Form>,
  document.getElementById('app')
)
