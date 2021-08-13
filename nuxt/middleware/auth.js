export default function ({ redirect, $axios }) {
  $axios.post('/auth/validate', '', { withCredentials: true })
    .then((result) => {
      if (!result.data.isValid) {
        redirect('/login')
      }
    })
    .catch(() => {
      redirect('/login')
    })
}
