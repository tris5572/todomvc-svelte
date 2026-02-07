<script lang="ts">
  type Props = {
    /** 残件数 */
    remaining: number;
  };

  let { remaining }: Props = $props();
</script>

<div class="container">
  <div>
    {#if remaining === 0}
      すべて完了
    {:else}
      残り{remaining}件
    {/if}
  </div>
</div>

<style>
  .container {
    display: flex;
  }
</style>
