<script setup lang="ts">
import { ref, onMounted } from "vue";

const auctions = ref([]);

onMounted(async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/auctions/");
        const data = await response.json();
        auctions.value = data.results;

        // Using the provided example data for now
        // const data = {
        //     count: 3,
        //     next: null,
        //     previous: null,
        //     results: [
        //         {
        //             id: 2,
        //             created_at: "08/08/2025 23:04:58",
        //             deleted_at: null,
        //             updated_at: "08/08/2025 23:04:58",
        //             is_active: true,
        //             name: "Leilão de Arte Clássica",
        //             category: 2,
        //             owner: 2,
        //             start_time: "08/08/2025 23:04:58",
        //             end_time: "08/08/2025 23:04:58",
        //             status: "ATIVO",
        //             items: [
        //                 {
        //                     id: 4,
        //                     created_at: "08/08/2025 23:04:58",
        //                     deleted_at: null,
        //                     updated_at: "08/08/2025 23:04:58",
        //                     is_active: true,
        //                     name: "Escultura de Bronze",
        //                     description:
        //                         "Escultura em bronze representando figura clássica, altura 45cm, base em mármore.",
        //                     starting_bid: "1800.00",
        //                     max_bid: "5000.00",
        //                     current_bid: "1800.00",
        //                     auction: 2,
        //                     image: null,
        //                 },
        //                 {
        //                     id: 3,
        //                     created_at: "08/08/2025 23:04:58",
        //                     deleted_at: null,
        //                     updated_at: "08/08/2025 23:04:58",
        //                     is_active: true,
        //                     name: "Pintura a Óleo Vintage",
        //                     description:
        //                         "Pintura a óleo de paisagem do século XIX, moldura original em madeira entalhada.",
        //                     starting_bid: "2500.00",
        //                     max_bid: "10000.00",
        //                     current_bid: "2800.00",
        //                     auction: 2,
        //                     image: null,
        //                 },
        //             ],
        //         },
        //         {
        //             id: 3,
        //             created_at: "08/08/2025 23:04:58",
        //             deleted_at: null,
        //             updated_at: "08/08/2025 23:04:58",
        //             is_active: true,
        //             name: "Leilão de Carros Antigos",
        //             category: 3,
        //             owner: 1,
        //             start_time: "08/08/2025 23:04:58",
        //             end_time: "08/08/2025 23:04:58",
        //             status: "ATIVO",
        //             items: [
        //                 {
        //                     id: 5,
        //                     created_at: "08/08/2025 23:04:58",
        //                     deleted_at: null,
        //                     updated_at: "08/08/2025 23:04:58",
        //                     is_active: true,
        //                     name: "Volkswagen Fusca 1975",
        //                     description:
        //                         "Fusca 1975 completamente restaurado, motor 1600, cor azul original.",
        //                     starting_bid: "25000.00",
        //                     max_bid: "50000.00",
        //                     current_bid: "27000.00",
        //                     auction: 3,
        //                     image: null,
        //                 },
        //             ],
        //         },
        //         {
        //             id: 1,
        //             created_at: "08/08/2025 23:04:58",
        //             deleted_at: null,
        //             updated_at: "08/08/2025 23:04:58",
        //             is_active: true,
        //             name: "Leilão de Eletrônicos Premium",
        //             category: 1,
        //             owner: 1,
        //             start_time: "08/08/2025 23:04:58",
        //             end_time: "08/08/2025 23:04:58",
        //             status: "AGUARDANDO",
        //             items: [
        //                 {
        //                     id: 2,
        //                     created_at: "08/08/2025 23:04:58",
        //                     deleted_at: null,
        //                     updated_at: "08/08/2025 23:04:58",
        //                     is_active: true,
        //                     name: "MacBook Pro M3",
        //                     description:
        //                         "MacBook Pro 14 polegadas com chip M3, 16GB RAM, 512GB SSD. Usado por apenas 6 meses.",
        //                     starting_bid: "8000.00",
        //                     max_bid: "15000.00",
        //                     current_bid: "8000.00",
        //                     auction: 1,
        //                     image: null,
        //                 },
        //                 {
        //                     id: 1,
        //                     created_at: "08/08/2025 23:04:58",
        //                     deleted_at: null,
        //                     updated_at: "08/08/2025 23:04:58",
        //                     is_active: true,
        //                     name: "iPhone 15 Pro Max",
        //                     description:
        //                         "iPhone 15 Pro Max 256GB em perfeito estado, com todos os acessórios originais.",
        //                     starting_bid: "4500.00",
        //                     max_bid: "8000.00",
        //                     current_bid: "4800.00",
        //                     auction: 1,
        //                     image: null,
        //                 },
        //             ],
        //         },
        //     ],
        // };
        auctions.value = data.results;
    } catch (error) {
        console.error("Error fetching auctions:", error);
    }
});

const getStatusColor = (status: string) => {
    if (status === "ATIVO") return "success";
    if (status === "AGUARDANDO") return "warning";
    return "secondary";
};
</script>

<template>
    <VRow>
        <VCol
            v-for="auction in auctions"
            :key="auction.id"
            cols="12"
            md="6"
            lg="4"
        >
            <VCard>
                <VCardItem>
                    <VCardTitle>{{ auction.name }}</VCardTitle>
                    <template #append>
                        <VChip
                            :color="getStatusColor(auction.status)"
                            size="small"
                            class="text-capitalize"
                        >
                            {{ auction.status }}
                        </VChip>
                    </template>
                </VCardItem>
                <VCardText>
                    <VList lines="two">
                        <VListItem v-for="item in auction.items" :key="item.id">
                            <VListItemTitle>{{ item.name }}</VListItemTitle>
                            <VListItemSubtitle>{{
                                item.description
                            }}</VListItemSubtitle>
                            <template #append>
                                <div class="text-right">
                                    <div class="font-weight-bold">
                                        R$ {{ item.current_bid }}
                                    </div>
                                    <div class="text-sm">Lance Atual</div>
                                </div>
                            </template>
                        </VListItem>
                    </VList>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
