<script lang="ts">
    import { user } from "$lib/firebase"
</script>

{#if $user}
    <slot />
{:else}
    <div class="flex flex-col gap-5">
        <p class="text-error">
            You must be signed in to view this page.
        </p>
        <a href="/login" class="btn btn-primary">Sign in</a>
    </div>
{/if}