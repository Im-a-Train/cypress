import { defaultMessages } from '@cy/i18n'
import Warning from './Warning.vue'
import faker from 'faker'
import { ref } from 'vue'

const title = faker.hacker.noun()
const message = `
# Hello!
> This is a **markdown formatted** message!

We're going to print out some \`console.log('cool code')\` and see how well it formats inside of our warning.
`

describe('<Warning />', () => {
  it('renders with title and message', () => {
    cy.mount(() => (<div class="p-4"><Warning
      data-cy="warning"
      title={title}
      message={message}
    /></div>))

    cy.contains(title)
    cy.get('[data-cy=warning]')
    .should('contain.text', 'Hello!')
    .and('contain.text', 'This is a markdown formatted message!')
    .and('contain.text', `We're going to print out some console.log('cool code') and see how well it formats inside of our warning.`)
  })

  it('calls dismiss when X is clicked', () => {
    const show = ref(true)
    const onUpdate = cy.spy()
    const methods = {
      'onUpdate:modelValue': (value) => {
        show.value = value
        onUpdate()
      },
    }

    cy.mount(() => (<div class="p-4"><Warning
      title={title}
      message={message}
      modelValue={show.value}
      {...methods}
    /></div>))

    cy.get(`[aria-label=${defaultMessages.components.alert.dismissAriaLabel}`).first().click()
    cy.wrap(onUpdate).should('be.called')
  })
})
