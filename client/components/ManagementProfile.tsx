import { makeParent, deleteUser } from '../apis/userApi'
import { User } from '@models/Iusers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  member: User
}
function ManagementProfile({ member }: Props) {
  const { getAccessTokenSilently, user } = useAuth0()
  const queryClient = useQueryClient()
  const accessTokenPromise = getAccessTokenSilently()

  const makeParentMutation = useMutation({
    mutationFn: async () => {
      const accessToken = await accessTokenPromise
      return await makeParent(accessToken, member.id as number)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['familymembers'] })
    },
  })

  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      const accessToken = await accessTokenPromise
      return await deleteUser(accessToken, member.id as number)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['familymembers'] })
    },
  })

  function handleParentClick() {
    makeParentMutation.mutate()
  }

  function handleDeleteClick() {
    deleteUserMutation.mutate()
  }

  return (
    <>
      <div className="flex items-center justify-around border border-4 border-white p-1 rounded-md w-1/2 my-8">
        <div className="flex flex-col items-center justify-center my-6">
          <h3>{member.name}</h3>
          <img src={member.picture} alt={member.name} className="my-4" />
        </div>
        <div className="flex flex-col items-center justify-center my-6">
          {member.is_parent ? <h2>Parent</h2> : <h2>Kid</h2>}
          {!member.is_parent && <h3>Points - {member.points}</h3>}
          <div className="flex items-center justify-center">
            {!member.is_parent && member.points === 0 ? (
              <button className="btn-primary" onClick={handleParentClick}>
                Make Parent?
              </button>
            ) : null}
            {member.auth_id !== user?.sub ? (
              <button onClick={handleDeleteClick} className="btn-primary">
                Delete User?
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default ManagementProfile