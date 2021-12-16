import { ProxySettingsFragmentDoc } from '../../generated/graphql-test'
import ProxySettings from './ProxySettings.vue'

describe('<ProxySettings />', () => {
  it('renders', () => {
    cy.viewport(400, 400)
    .mountFragment(ProxySettingsFragmentDoc, {
      onResult: (ctx) => {
        ctx.localSettings.preferences.proxyServer = 'proxy-server'
        ctx.localSettings.preferences.proxyBypass = 'proxy-bypass'
      },
      render: (gql) => <ProxySettings gql={gql} />,
    })

    cy.findByText('Proxy Bypass List')
    .findByTestId('bypass-list').contains('proxy-bypass')

    cy.findByText('Proxy Server')
    .findByTestId('proxy-server').contains('proxy-server')
  })
})
