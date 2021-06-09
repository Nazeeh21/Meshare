import { useQuestionQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetQuestionFromUrl = () => {
const intId = useGetIntId()

return useQuestionQuery({
  pause: intId === -1,
  variables: {
    id: intId
  }
})
}