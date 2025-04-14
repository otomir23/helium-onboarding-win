<script lang="ts">
    import IconExternalLink from "../icons/tabler/IconExternalLink.svelte";

    export let title: string;
    export let desc: string;
    export let dest: string;
    export let inactive: boolean = false;
</script>

<a
    class="button big button-link"
    class:inactive
    href={dest}
    target="_blank"
    rel="noopener noreferrer"
>
    <div class="link-text">
        <h4>
            {title}
        </h4>
        <p>
            {desc}
        </p>
    </div>
    <div class="icon">
        <IconExternalLink />
    </div>
</a>

<style>
    .button-link {
        text-decoration: none;
        align-items: flex-start;

        & :global(svg) {
            width: 24px;
            height: 24px;
        }
    }

    .link-text {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
</style>
