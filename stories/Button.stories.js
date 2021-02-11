import React from 'react'

import Button from '../components/ui/Button'

export default {
  title: 'UI/Button',
  component: Button
}

const Template = (args) => <Button {...args}>Button</Button>

export const Flat = Template.bind({})
Flat.args = {
  variant: 'flat'
}
