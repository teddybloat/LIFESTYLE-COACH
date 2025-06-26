import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';

// --- UI Components ---

const Card = ({ title, children }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        {children}
    </View>
);

const LIFESTYLE_DATA = {
    treatMeal: 'Lamb Kebabs',
    mealPlan: { Mon: { Breakfast: 'Smoothie & Overnight Oats', Dinner: 'Lemon & Herb Chicken' }, Tue: { Breakfast: 'Smoothie & Overnight Oats', Dinner: 'Pan-Seared Salmon' }, Wed: { Breakfast: 'Smoothie & Overnight Oats', Dinner: 'Pasta or Baked Potatoes' }, Thu: { Breakfast: 'Smoothie & Overnight Oats', Dinner: 'Baked Cod with Pesto' }, Fri: { Breakfast: 'Smoothie & Overnight Oats', Dinner: 'Chicken Stir-fry' }, Sat: { Breakfast: 'Smoked Salmon & Avocado Bagel', Dinner: 'TREAT MEAL' }, Sun: { Breakfast: 'Full Cook-up', Dinner: 'Burgers' } },
    shoppingList: [ { category: 'Protein', items: ['Chicken Breasts (x4)', 'Salmon Fillets (x2)', 'Cod Fillets (x2)', 'Diced Lamb OR Pizza Toppings', 'Sausages', 'Bacon', 'Burgers', 'Dog Steak'] }, { category: 'Dairy & Cheese', items: ['Halloumi OR Extra Cheese for Pizza', 'Milk', 'Yogurt (for oats)', 'Pesto'] }, { category: 'Fruit & Veg', items: ['Lemons', 'Asparagus', 'Cherry Tomatoes', 'Fresh Tomato', 'Stir-fry Veg Pack', 'Salad Bag', 'Avocado', 'Onions', 'Garlic'] }, { category: 'Bakery & Grains', items: ['Thin Bagels', 'Overnight Oats', 'Pasta OR Baking Potatoes'] }, { category: 'Pantry', items: ['Dried Herbs', 'Soy Sauce', 'Ginger/Garlic Paste', 'Frozen Berries (for smoothie)'] } ],
    cleaningSchedule: { Daily: 'Make bed, wipe kitchen counters, 5-min living room tidy.', Mon: 'Bathroom Blitz', Tues: 'Dusting Day', Wed: 'Floor Day (Hoover)', Thurs: 'Kitchen Focus', Fri: 'Fresh Start (change bedsheets, bins out)', Weekend: 'Laundry' },
    selfCareRoutine: { Morning: 'Shower, cleanse face, moisturize face & body, deodorant.', Evening: 'Cleanse face, moisturize, 15 mins of non-screen relaxation.' }
};

const MealPlan = ({ plan, treatMeal }) => (
    <Card title="?? Weekly Meal Plan">
        {Object.entries(plan).map(([day, meals]) => (
            <View key={day} style={styles.mealDay}>
                <Text style={styles.boldText}>{day}</Text>
                <Text style={styles.lightText}>B: {meals.Breakfast}</Text>
                <Text style={styles.lightText}>D: {meals.Dinner.replace('TREAT MEAL', treatMeal)}</Text>
            </View>
        ))}
    </Card>
);

const ShoppingList = ({ list }) => (
    <Card title="?? Aldi Shopping List">
        {list.map((category) => (
            <View key={category.category} style={styles.mealDay}>
                <Text style={styles.boldText}>{category.category}</Text>
                {category.items.map(item => (
                    <Text key={item} style={styles.lightText}>- {item}</Text>
                ))}
            </View>
        ))}
    </Card>
);

const CleaningSchedule = ({ schedule }) => (
     <Card title="?? Cleaning Focus">
        {Object.entries(schedule).map(([day, task]) => (
            <View key={day} style={{flexDirection: 'row'}}>
                <Text style={styles.boldText}>{day}: </Text>
                <Text style={styles.lightText}>{task}</Text>
            </View>
        ))}
    </Card>
);

const TreatMealSelector = ({ currentMeal, setMeal }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>?? Select Saturday Treat Meal</Text>
        <View style={styles.buttonContainer}>
             <TouchableOpacity 
                onPress={() => setMeal('Lamb Kebabs')}
                style={[styles.button, currentMeal === 'Lamb Kebabs' ? styles.buttonActive : styles.buttonInactive]}
            >
                <Text style={styles.buttonText}>Lamb Kebabs</Text>
            </TouchableOpacity>
             <TouchableOpacity 
                onPress={() => setMeal('Pizza Night')}
                style={[styles.button, currentMeal === 'Pizza Night' ? styles.buttonActive : styles.buttonInactive]}
            >
                <Text style={styles.buttonText}>Pizza Night</Text>
            </TouchableOpacity>
        </View>
    </View>
);

// --- Main App Component ---
export default function App() {
    const [treatMeal, setTreatMeal] = useState(LIFESTYLE_DATA.treatMeal);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>Your Weekly Plan</Text>
                <TreatMealSelector currentMeal={treatMeal} setMeal={setTreatMeal} />
                <MealPlan plan={LIFESTYLE_DATA.mealPlan} treatMeal={treatMeal} />
                <ShoppingList list={LIFESTYLE_DATA.shoppingList} />
                <CleaningSchedule schedule={LIFESTYLE_DATA.cleaningSchedule} />
            </ScrollView>
        </SafeAreaView>
    );
}

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
    },
    scrollContainer: {
        padding: 16,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#1F2937',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    mealDay: {
        marginBottom: 8,
    },
    boldText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    lightText: {
        color: '#D1D5DB',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonActive: {
        backgroundColor: '#3b82f6',
    },
    buttonInactive: {
        backgroundColor: '#374151',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
```
---

You have now completed the hardest part. You should have a folder named `LifestyleCoach` with three files inside it: `package.json`, `app.json`, and `App.js`.

Let me know when you are ready for the final two steps to build the a