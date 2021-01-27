import React from 'react'
import { User } from 'ProjectPlanner/types'

type Props = {
  onAuthenticated?(user: User): void
}

export const SignupForm: React.FC<Props> = ({ onAuthenticated }) => {
  return <div>Signup</div>
}
