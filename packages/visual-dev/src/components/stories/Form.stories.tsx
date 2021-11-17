import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Radio, RSJFRadioWidget } from '../Radio'
import { Input, RJSFCancellableInput, RJSFClearableInput, RJSFInput, RJSFLockableInput, RJSFNumericalInput } from '../Input'
import Form from '@rjsf/core'

export default {
  title: 'Components / Form',
  component: Form,
}

const log = (type) => console.log.bind(console, type)

export const ExampleForm = () => {
  const uiSchema = {
    'ui:widget': (props) => {
      return <RJSFInput {...props} />
    },
  }

  const schema: JSONSchema7 = {
    type: 'string',
  }
  return (
    <div style={{ margin: '100px' }}>
      <Form schema={schema} uiSchema={uiSchema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')}>
        <Button buttonType='primary' style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export const ExampleNumericalForm = () => {
  const uiSchema = {
    'ui:widget': (props) => {
      return <RJSFNumericalInput {...props} />
    },
  }

  const schema: JSONSchema7 = {
    type: 'string',
  }
  return (
    <div style={{ margin: '100px' }}>
      <Form schema={schema} uiSchema={uiSchema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')}>
        <Button buttonType='primary' style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  )
}


export const ExampleLockableForm = () => {
  const uiSchema = {
    'ui:widget': (props) => {
      return <RJSFLockableInput {...props} />
    },
  }

  const schema: JSONSchema7 = {
    type: 'string',
  }
  return (
    <div style={{ margin: '100px' }}>
      <Form schema={schema} uiSchema={uiSchema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')}>
        <Button buttonType='primary' style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  )
}



export const ExampleClearableForm = () => {
  const uiSchema = {
    'ui:widget': (props) => {
      return <RJSFClearableInput {...props} />
    },
  }

  const schema: JSONSchema7 = {
    type: 'string',
  }
  return (
    <div style={{ margin: '100px' }}>
      <Form schema={schema} uiSchema={uiSchema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')}>
        <Button buttonType='primary' style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  )
}



export const ExampleCancellableForm = () => {
  const uiSchema = {
    'ui:widget': (props) => {
      return <RJSFCancellableInput {...props} />
    },
  }

  const schema: JSONSchema7 = {
    type: 'string',
  }
  return (
    <div style={{ margin: '100px' }}>
      <Form schema={schema} uiSchema={uiSchema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')}>
        <Button buttonType='primary' style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  )
}


// // Checkboxes
// export const CheckForm = () => {
//   const schema: JSONSchema7 = {
//     type: 'object',
//     properties: {
//       Done: {
//         type: 'boolean',
//         title: 'Done',
//       },
//     },
//   }

//   console.log('im the story')

//   const Checkbox2 = (props) => {
//     console.log(props.options)
//     return <div>test</div>
//   }

//   const uiSchema = {
//     Done: {
//       'ui:widget': 'Radio',
//       'ui:options': {
//         cardFormat: true,
//         radioOptions: [
//           {
//             key: 'create',
//             label: 'Create',
//             name: 'action',
//           },
//           {
//             key: 'update',
//             label: 'Update',
//             name: 'action',
//           },
//           {
//             key: 'edit',
//             label: 'Edit',
//             name: 'action',
//           },
//         ],
//       },
//     },
//   }

//   const widgets = {
//     Radio: Radio,
//   }

//   return (
//     <div style={{ margin: '100px' }}>
//       <Form schema={schema} uiSchema={uiSchema} widgets={widgets} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')}>
//         <Button buttonType='primary' style={{ marginTop: 15 }}>
//           Submit
//         </Button>
//       </Form>
//     </div>
//   )
// }

export const RadioForm = () => {
  const schema: JSONSchema7 = {
    "type": "object",
    "properties": {
      "numberEnumRadio": {
        "type": "number",
        "title": "Number enum",
        "enum": [
          1,
          2,
          3
        ]
      }
    }
  }

  const uiSchema = {
    "numberEnumRadio": {
        "ui:widget": RSJFRadioWidget
      }
  }

  return (
    <div style={{ margin: '100px' }}>
      <Form schema={schema} uiSchema={uiSchema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')}>
        <Button buttonType='primary' style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
