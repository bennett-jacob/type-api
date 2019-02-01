import { gql } from 'apollo-server-express'
import { logger } from '../../../config/logger'
import { pubsub } from '../subscriptions'

export const subscriptions = {
  {{ uppercase entityName }}_ADDED: '{{ uppercase entityName }}_ADDED',
}

const Subscription = gql`
  extend type Subscription {
    {{ entityName }}Added: {{ capitalize entityName }}
  }
`

export const subscriptionTypes = () => [ Subscription ]

export const subscriptionResolvers = {
  Subscription: {
    {{ entityName }}Added: {
      resolve: ({{ entityName }}) => {
        return {{ entityName }}
      },
      subscribe: () => pubsub.asyncIterator([subscriptions.{{ uppercase entityName }}_ADDED]),
    },
  },
}
