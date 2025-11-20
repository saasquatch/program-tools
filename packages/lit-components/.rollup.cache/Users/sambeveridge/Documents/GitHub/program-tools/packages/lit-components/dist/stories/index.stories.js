import { html } from 'lit';
import '../src/sql-referral-code.js';
export default {
    title: 'SqlReferralCode',
    component: 'sql-referral-code',
    argTypes: {
        header: { control: 'text' },
        counter: { control: 'number' },
        textColor: { control: 'color' },
    },
};
const Template = ({ header = 'Hello world', counter = 5, textColor, slot, }) => html `
  <sql-referral-code
    style="--sql-referral-code-text-color: ${textColor || 'black'}"
    .header=${header}
    .counter=${counter}
  >
    ${slot}
  </sql-referral-code>
`;
export const Regular = Template.bind({});
export const CustomHeader = Template.bind({});
CustomHeader.args = {
    header: 'My header',
};
export const CustomCounter = Template.bind({});
CustomCounter.args = {
    counter: 123456,
};
export const SlottedContent = Template.bind({});
SlottedContent.args = {
    slot: html `<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
    slot: { table: { disable: true } },
};
//# sourceMappingURL=index.stories.js.map