const supabase = useSupabaseClient();
const { data: { user } } = await supabase.auth.getUser();
export default defineNuxtRouteMiddleware((to, from) => {
  if (user) {
    return navigateTo("/");
  };
});
