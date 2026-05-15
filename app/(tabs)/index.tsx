import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PURPLE = "#9C3FE8";

export default function App() {
  const [screen, setScreen] = useState(1);
  const [teamName, setTeamName] = useState("");

  return (
    <View style={styles.container}>
      {screen === 1 && <SignUp next={() => setScreen(2)} />}
      {screen === 2 && (
        <CreateTeam
          next={() => setScreen(3)}
          back={() => setScreen(1)}
          teamName={teamName}
          setTeamName={setTeamName}
        />
      )}
      {screen === 3 && <Dashboard next={() => setScreen(4)} back={() => setScreen(2)} teamName={teamName} />}
      {screen === 4 && <ActivityList next={() => setScreen(5)} back={() => setScreen(3)} />}
      {screen === 5 && <ActivityDetails next={() => setScreen(6)} back={() => setScreen(4)} />}
      {screen === 6 && <AttemptScreen back={() => setScreen(5)} />}
    </View>
  );
}

function Header({ title, back }: any) {
  return (
    <View style={styles.header}>
      <Text style={styles.back} onPress={back}>Back</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.back}>Next</Text>
    </View>
  );
}

function SignUp({ next }: any) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.logo}><Text>Logo</Text></View>
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={next}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.link}>Forgot your password?</Text>
      <BottomDots active={0} />
    </View>
  );
}

function CreateTeam({ next, back, teamName, setTeamName }: any) {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Header title="Create your team" back={back} />
      <Text style={styles.label}>Team Name</Text>
      <TextInput style={styles.input} placeholder="Enter team name" value={teamName} onChangeText={setTeamName} />
      <Text style={styles.label}>Team Members</Text>
      <TextInput style={styles.input} placeholder="Name 1" />
      <TextInput style={styles.input} placeholder="Name 2" />
      <TextInput style={styles.input} placeholder="Name 3" />
      <TextInput style={styles.input} placeholder="Name 4" />
      <Text style={styles.label}>Year Level</Text>
      <TextInput style={styles.input} placeholder="Enter year level" />
      <TouchableOpacity style={styles.button} onPress={next}>
        <Text style={styles.buttonText}>Start!</Text>
      </TouchableOpacity>
      <BottomDots active={1} />
    </ScrollView>
  );
}

function Dashboard({ next, back, teamName }: any) {
  return (
    <View style={styles.screen}>
      <Header title={`${teamName || "Team name"} Dashboard`} back={back} />
      <TouchableOpacity style={styles.button} onPress={next}><Text style={styles.buttonText}>Activities</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Leaderboard</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>History</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Continue Last Activity</Text></TouchableOpacity>
      <BottomDots active={2} />
    </View>
  );
}

function ActivityList({ next, back }: any) {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Header title="Activity List" back={back} />
      <TextInput style={styles.input} placeholder="Search" />
      <Text style={styles.sectionTitle}>Engineering</Text>
      <View style={styles.grid}>
        <Card title="Parachute Drop Challenge" onPress={next} />
        <Card title="Earthquake Resistant Structure" onPress={next} />
        <Card title="Hand Fan Challenge" onPress={next} />
      </View>
      <Text style={styles.sectionTitle}>Medicine</Text>
      <View style={styles.grid}>
        <Card title="Human Performance Lab" onPress={next} />
        <Card title="Reaction Board Challenge" onPress={next} />
        <Card title="Breathing Pacer Trainer" onPress={next} />
      </View>
      <BottomDots active={3} />
    </ScrollView>
  );
}

function ActivityDetails({ next, back }: any) {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Header title="Parachute Drop Challenge Details" back={back} />
      <View style={styles.imageBox} />
      <Text style={styles.sectionTitle}>Overview</Text>
      <Text style={styles.text}>Students design and test a parachute to slow down the fall of an object.</Text>
      <Text style={styles.sectionTitle}>Equipment needed:</Text>
      <Text style={styles.text}>Paper, string, tape, scissors, and a small object.</Text>
      <Text style={styles.sectionTitle}>Instructions:</Text>
      <Text style={styles.text}>1. Build the parachute.{"\n"}2. Attach the object.{"\n"}3. Drop it safely.{"\n"}4. Record the result.</Text>
      <TouchableOpacity style={styles.button} onPress={next}>
        <Text style={styles.buttonText}>Start Attempt</Text>
      </TouchableOpacity>
      <BottomDots active={4} />
    </ScrollView>
  );
}

function AttemptScreen({ back }: any) {
  return (
    <View style={styles.screen}>
      <Header title="Attempt 1" back={back} />
      <View style={styles.timer}>
        <Text>Timer</Text>
        <Text>00:30</Text>
      </View>
      <Text style={styles.sectionTitle}>Instructions:</Text>
      <Text style={styles.text}>1. Prepare your design.{"\n"}2. Start the timer.{"\n"}3. Test your parachute.{"\n"}4. Record results.{"\n"}5. Submit attempt.</Text>
      <BottomDots active={5} />
    </View>
  );
}

function Card({ title, onPress }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

function BottomDots({ active }: any) {
  return (
    <View style={styles.dots}>
      {[0, 1, 2, 3, 4, 5].map((dot) => (
        <View key={dot} style={[styles.dot, active === dot && styles.activeDot]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  screen: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  back: { color: PURPLE, fontSize: 14 },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center" },
  logo: { width: 70, height: 70, borderRadius: 35, backgroundColor: "#eee", alignSelf: "center", alignItems: "center", justifyContent: "center", marginVertical: 20 },
  input: { backgroundColor: "#f1f1f1", borderRadius: 10, padding: 14, marginBottom: 12 },
  label: { fontWeight: "600", marginBottom: 5 },
  button: { backgroundColor: PURPLE, padding: 15, borderRadius: 30, alignItems: "center", marginVertical: 10 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  link: { color: PURPLE, textAlign: "center", marginTop: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginTop: 15, marginBottom: 10 },
  text: { fontSize: 14, lineHeight: 22 },
  imageBox: { width: "100%", height: 180, backgroundColor: "#f1f1f1", borderRadius: 12, marginBottom: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: { width: "48%", height: 100, backgroundColor: "#f1f1f1", borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 15, padding: 6 },
  cardText: { fontSize: 11, textAlign: "center" },
  timer: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#eee", justifyContent: "center", alignItems: "center", alignSelf: "center", marginVertical: 25 },
  dots: { flexDirection: "row", justifyContent: "center", marginTop: 25 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#ddd", marginHorizontal: 6 },
  activeDot: { backgroundColor: PURPLE },
});