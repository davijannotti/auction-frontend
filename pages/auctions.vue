<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const auctions = ref([]);

// Define os status possíveis e suas configurações
const statusConfig = [
    {
        key: "ATIVO",
        label: "Ativos",
        color: "success",
        icon: "mdi-gavel",
    },
    {
        key: "AGUARDANDO",
        label: "Aguardando",
        color: "warning",
        icon: "mdi-clock-outline",
    },
    {
        key: "ENCERRADO",
        label: "Encerrados",
        color: "info",
        icon: "mdi-check-circle",
    },
    {
        key: "CANCELADO",
        label: "Cancelados",
        color: "error",
        icon: "mdi-cancel",
    },
];

// Agrupa leilões por status
const auctionsByStatus = computed(() => {
    const grouped = {};
    statusConfig.forEach((status) => {
        grouped[status.key] = auctions.value.filter(
            (auction) => auction.status === status.key,
        );
    });
    return grouped;
});

onMounted(async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/auctions/");
        const data = await response.json();
        auctions.value = data.results;
    } catch (error) {
        console.error("Error fetching auctions:", error);
    }
});
</script>

<template>
    <VRow>
        <!-- Coluna para cada status -->
        <VCol
            v-for="statusItem in statusConfig"
            :key="statusItem.key"
            cols="12"
            md="6"
            lg="3"
            class="d-flex flex-column"
        >
            <!-- Header da coluna -->
            <VCard class="mb-4" variant="tonal" :color="statusItem.color">
                <VCardItem class="py-3">
                    <template #prepend>
                        <VIcon :icon="statusItem.icon" size="small"></VIcon>
                    </template>
                    <VCardTitle class="text-h6">
                        {{ statusItem.label }}
                        <VChip
                            :color="statusItem.color"
                            size="small"
                            class="ml-2"
                        >
                            {{ auctionsByStatus[statusItem.key].length }}
                        </VChip>
                    </VCardTitle>
                </VCardItem>
            </VCard>

            <!-- Lista de leilões desta coluna -->
            <div class="flex-grow-1">
                <VCard
                    v-for="auction in auctionsByStatus[statusItem.key]"
                    :key="auction.id"
                    class="mb-3"
                    elevation="2"
                >
                    <VCardItem>
                        <VCardTitle class="text-body-1">{{
                            auction.name
                        }}</VCardTitle>
                    </VCardItem>
                    <VCardText>
                        <VList lines="two" density="compact">
                            <VListItem
                                v-for="item in auction.items"
                                :key="item.id"
                                class="px-0"
                            >
                                <VListItemTitle class="text-body-2">
                                    {{ item.name }}
                                </VListItemTitle>
                                <VListItemSubtitle class="text-caption">
                                    {{ item.description }}
                                </VListItemSubtitle>
                                <template #append>
                                    <div class="text-right">
                                        <div
                                            class="font-weight-bold text-body-2"
                                        >
                                            R$ {{ item.current_bid }}
                                        </div>
                                        <div
                                            class="text-caption text-medium-emphasis"
                                        >
                                            Lance Atual
                                        </div>
                                    </div>
                                </template>
                            </VListItem>
                        </VList>
                    </VCardText>
                </VCard>

                <!-- Mensagem quando não há leilões -->
                <VCard
                    v-if="auctionsByStatus[statusItem.key].length === 0"
                    variant="outlined"
                    class="text-center py-8"
                >
                    <VCardText>
                        <VIcon
                            :icon="statusItem.icon"
                            size="large"
                            class="text-medium-emphasis mb-2"
                        ></VIcon>
                        <div class="text-medium-emphasis">Nenhum leilão</div>
                    </VCardText>
                </VCard>
            </div>
        </VCol>
    </VRow>
</template>
