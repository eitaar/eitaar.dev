const supabase = useSupabaseClient();
export default defineNuxtRouteMiddleware(async(to, from) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    return navigateTo("/");
  };
});
