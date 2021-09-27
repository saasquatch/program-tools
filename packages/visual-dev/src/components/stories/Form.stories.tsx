import { JSONSchema6 } from 'json-schema'
import React from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import Form, { FormProps } from 'react-jsonschema-form'

export default {
  title: 'Components / Form',
  component: Form,
}

const log = (type) => console.log.bind(console, type)

export const ExampleForm = () => {
  const uiSchema = {
    'ui:widget': (props) => {
      return <Input value={props.value} required={props.required} onChange={(event) => props.onChange(event.target.value)} />
    },
  }

  const schema: JSONSchema6 = {
    type: 'string',
  }
  return (
    <div style={{ margin: '100px' }}>
      <Form schema={schema} uiSchema={uiSchema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')}>
        <Button variant='primary' style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export const CheckForm = () => {
  const schema: JSONSchema6 = {
    type: 'boolean',
    default: false,
  }

  const uiSchema = {
    'ui:widget': 'checkbox',
  }

  const CustomCheckbox = function (props) {
    const options = {
      text: 'JSON Schema Checkmark',
    }
    return <Checkbox id='custom' onClick={() => props.onChange(!props.value)} options={options}></Checkbox>
  }

  const widgets = {
    CheckboxWidget: CustomCheckbox,
  }

  return (
    <div style={{ margin: '100px' }}>
      <Form schema={schema} uiSchema={uiSchema} widgets={widgets} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')}>
        <Button variant='primary' style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export const RadioForm = () => {
  const schema: JSONSchema6 = {
    type: 'object',
    properties: {
      done: {
        type: 'boolean',
      },
    },
  }

  const uiSchema = {
    'ui:widget': 'radio',
  }

  //   const CustomCheckbox = function (props) {
  //     const options = {
  //       text: 'JSON Schema Checkmark',
  //     }
  //     return <Checkbox id='custom' onClick={() => props.onChange(!props.value)} options={options}></Checkbox>
  //   }

  //   const widgets = {
  //     CheckboxWidget: CustomCheckbox,
  //   }

  return (
    <div style={{ margin: '100px' }}>
      <Form schema={schema} uiSchema={uiSchema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')}>
        <Button variant='primary' style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
