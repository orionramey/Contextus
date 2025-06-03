import React, { useState, useEffect } from 'react';
import { ChevronRight, Terminal, Shield, Database, GitBranch, Heart, Compass, Package, Code, Layers, CheckCircle, Circle, ExternalLink, AlertCircle, Copy, Check, Download, ArrowDown, Award, Users, Settings, Monitor, Zap, FileText, ArrowRight, Coffee, Book, Wrench, Cpu, Cloud, Lock } from 'lucide-react';

const EngineeringJourney = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [discoveryStep, setDiscoveryStep] = useState(0);
  const [userPath, setUserPath] = useState(null);
  const [completedChapters, setCompletedChapters] = useState(new Set());
  const [currentReflection, setCurrentReflection] = useState('');
  const [labSetupStep, setLabSetupStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});
  const [osType, setOsType] = useState(null);
  const [gitHubUsername, setGitHubUsername] = useState('');
  const [terminalAnimationComplete, setTerminalAnimationComplete] = useState({});
  const [hoveredPath, setHoveredPath] = useState(null);

  // Animated Terminal Component with philosophical touch
  const AnimatedTerminal = ({ commands, output, onComplete, id }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
      if (currentIndex < output.length) {
        const timer = setTimeout(() => {
          setDisplayedText(output.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 30);
        return () => clearTimeout(timer);
      } else if (onComplete && !terminalAnimationComplete[id]) {
        setTerminalAnimationComplete(prev => ({ ...prev, [id]: true }));
        onComplete();
      }
    }, [currentIndex, output, onComplete, id]);

    useEffect(() => {
      setDisplayedText('');
      setCurrentIndex(0);
    }, [output]);

    return (
      <div className="bg-gray-950 rounded-2xl p-8 font-mono text-sm shadow-2xl border border-gray-800">
        {commands.map((cmd, idx) => (
          <div key={idx} className="mb-3 text-gray-400">
            <span className="text-emerald-400">λ </span>
            <span className="text-gray-300">{cmd}</span>
          </div>
        ))}
        <div className="text-gray-300 whitespace-pre-wrap leading-relaxed mt-4">{displayedText}</div>
        {currentIndex < output.length && <span className="inline-block w-3 h-5 bg-emerald-400 animate-pulse ml-1" />}
      </div>
    );
  };

  // Discovery chapters reimagined with Rick Rubin's philosophical depth
  const discoveryChapters = [
    {
      id: 'awakening',
      number: '00',
      title: 'The Unbecoming',
      subtitle: 'You cannot build tomorrow with yesterday\'s tools',
      icon: Shield,
      content: (
        <div className="space-y-16 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <p className="text-3xl font-light text-gray-700 leading-relaxed">
              Every master was once a disaster.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              Through failure, I found my <span className="italic">thumos</span>—that ancient Greek fire in the chest,
              <br />
              the spirited courage that transforms curiosity into creation.
              <br />
              <span className="italic">This is your invitation to burn.</span>
            </p>
          </div>
          
          <div className="bg-gradient-to-b from-gray-50 to-white p-12 rounded-3xl border border-gray-200 shadow-sm">
            <p className="text-2xl text-gray-800 font-light text-center mb-8">
              Military acronyms and buzzwords—those hollow vessels 
              we filled to complete our evaluations—they are not chains.
              <br />
              <span className="font-medium">They are anchors in a civilian sea.</span>
            </p>
            <p className="text-center text-gray-600 italic">
              Cut the rope. Drift. Find new shores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <div className="space-y-6">
              <h3 className="text-xl font-light text-gray-800 flex items-center gap-3">
                <Terminal className="w-6 h-6 text-gray-400" />
                What You Were
              </h3>
              <div className="space-y-4 text-gray-600">
                <p className="pl-8 border-l-2 border-gray-200">
                  "I administered systems"
                  <span className="block text-sm text-gray-500 mt-1">You maintained other people's dreams</span>
                </p>
                <p className="pl-8 border-l-2 border-gray-200">
                  "I followed procedures"
                  <span className="block text-sm text-gray-500 mt-1">You walked in footprints, never leaving your own</span>
                </p>
                <p className="pl-8 border-l-2 border-gray-200">
                  "I fixed what broke"
                  <span className="block text-sm text-gray-500 mt-1">You healed symptoms, never touching the cause</span>
                </p>
                <p className="pl-8 border-l-2 border-gray-200">
                  "I served faithfully"
                  <span className="block text-sm text-gray-500 mt-1">You gave your power to the machine</span>
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-light text-gray-800 flex items-center gap-3">
                <Code className="w-6 h-6 text-emerald-600" />
                What You're Becoming
              </h3>
              <div className="space-y-4 text-gray-600">
                <p className="pl-8 border-l-2 border-emerald-200">
                  "I architect possibility"
                  <span className="block text-sm text-emerald-600 mt-1">You build bridges to futures only you can see</span>
                </p>
                <p className="pl-8 border-l-2 border-emerald-200">
                  "I write the rules"
                  <span className="block text-sm text-emerald-600 mt-1">Your code becomes law in digital realms</span>
                </p>
                <p className="pl-8 border-l-2 border-emerald-200">
                  "I prevent the breaking"
                  <span className="block text-sm text-emerald-600 mt-1">You see problems before they're born</span>
                </p>
                <p className="pl-8 border-l-2 border-emerald-200">
                  "I serve my vision"
                  <span className="block text-sm text-emerald-600 mt-1">You become the machine that creates</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <AnimatedTerminal 
              commands={[
                'whoami',
                'echo "What I was is not who I am..."',
                'sudo rm -rf /old/identity/*',
                'mkdir -p /new/possibility'
              ]}
              output={`35T_maintenance_technician

What I was is not who I am...

[sudo] password for transformation: ********
removing '/old/identity/comfortable'...
removing '/old/identity/certain'...
removing '/old/identity/small'...

creating directory '/new/possibility'

Between the last command and the next lies everything.
In the space between keystrokes, universes wait.

You are not your MOS.
You are not your clearance.
You are not your DD-214.

You are what you build next.`}
              id="awakening-terminal"
            />
          </div>

          <div className="bg-amber-50/50 p-10 rounded-3xl border border-amber-200">
            <p className="text-xl text-amber-800 font-light leading-relaxed">
              <span className="italic">Thumos</span>—that warrior's fire you carried in combat—
              <br />
              now burns to build, not destroy.
              <br />
              <span className="font-medium">This is the first engineering principle: Transform your fire.</span>
            </p>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setDiscoveryStep(1)}
              className="group px-12 py-5 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl font-light text-lg"
            >
              I Am Ready to Unbecome
              <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'choice',
      number: '01',
      title: 'The Fork',
      subtitle: 'Where warriors choose to become builders',
      icon: GitBranch,
      wisdom: 'One path leads to yesterday. The other creates tomorrow.',
      content: (
        <div className="space-y-16 max-w-5xl mx-auto">
          <div className="text-center space-y-6">
            <p className="text-3xl font-light text-gray-700">
              Two doors. One choice. No return.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              The comfortable path maintains what is.
              <br />
              The uncertain path creates what could be.
              <br />
              <span className="italic mt-4 block">Which engineer will you become?</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            <div 
              className={`relative bg-gray-50 p-10 rounded-3xl cursor-pointer transition-all duration-500 ${
                hoveredPath === 'admin' ? 'transform scale-95 opacity-75' : ''
              }`}
              onMouseEnter={() => setHoveredPath('admin')}
              onMouseLeave={() => setHoveredPath(null)}
            >
              <div className="absolute top-6 right-6 text-gray-300 text-6xl font-light opacity-20">↓</div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Settings className="w-10 h-10 text-gray-500" />
                  <h3 className="text-2xl font-light text-gray-700">Systems Administration</h3>
                </div>
                <p className="text-gray-600 mb-8 italic">
                  The path of maintenance
                </p>
                
                <div className="space-y-4 text-gray-600">
                  <p>Here, you will age gracefully with the servers.</p>
                  <p>Your days measured in tickets closed, not dreams built.</p>
                  <p>You will become very good at keeping the lights on.</p>
                  <p className="font-medium">Until someone builds a better light switch.</p>
                </div>
                
                <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-200">
                  <p className="text-red-800 text-sm leading-relaxed">
                    Choose this, and sleep well in routine.
                    <br />
                    <span className="font-medium">But know: what humans maintain, machines will soon do better.</span>
                  </p>
                </div>
              </div>
            </div>

            <div 
              className={`relative bg-gradient-to-br from-emerald-50 to-teal-50 p-10 rounded-3xl cursor-pointer transition-all duration-500 ${
                hoveredPath === 'engineer' ? 'transform scale-105 shadow-2xl' : 'hover:scale-102'
              }`}
              onMouseEnter={() => setHoveredPath('engineer')}
              onMouseLeave={() => setHoveredPath(null)}
            >
              <div className="absolute top-6 right-6 text-emerald-300 text-6xl font-light opacity-30">↗</div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Code className="w-10 h-10 text-emerald-600" />
                  <h3 className="text-2xl font-light text-emerald-800">Systems Engineering</h3>
                </div>
                <p className="text-emerald-700 mb-8 italic">
                  The path of creation
                </p>
                
                <div className="space-y-4 text-emerald-700">
                  <p>Here, you will fail until you don't.</p>
                  <p>Your nights spent dreaming in code, not counting sheep.</p>
                  <p>You will become comfortable with confusion.</p>
                  <p className="font-medium">And from that chaos, you will birth order.</p>
                </div>
                
                <div className="mt-8 p-6 bg-emerald-100 rounded-2xl border border-emerald-300">
                  <p className="text-emerald-900 text-sm leading-relaxed">
                    Choose this, and embrace the storm.
                    <br />
                    <span className="font-medium">You don't use tools—you forge them.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 p-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl">
            <p className="text-2xl text-gray-800 font-light text-center leading-relaxed">
              Systems engineering allows you to build your own foundations.
              <br />
              <span className="font-medium">Stop living in houses others designed.</span>
            </p>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => {
                setUserPath('engineer');
                setDiscoveryStep(2);
              }}
              className="group px-12 py-5 bg-emerald-700 text-white rounded-2xl hover:bg-emerald-800 transition-all transform hover:scale-105 shadow-xl font-light text-lg"
            >
              I Choose to Create
              <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-gray-500 text-sm mt-4 italic">
              This is the only choice that matters
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'stack',
      number: '02',
      title: 'The Elements',
      subtitle: 'Your tools are not your talent',
      icon: Layers,
      wisdom: 'A paintbrush never made a painting',
      content: (
        <div className="space-y-16 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <p className="text-3xl font-light text-gray-700">
              What is a stack?
            </p>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              A carpenter carries hammer and saw.
              <br />
              An engineer carries Linux and logic.
              <br />
              <span className="italic mt-4 block">
                But the real tools live between your ears.
              </span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-12 rounded-3xl border border-amber-200">
            <h3 className="text-2xl font-light text-amber-900 mb-10 text-center">
              The Sacred Stack
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-amber-800">
                  <Wrench className="w-8 h-8" />
                  <h4 className="text-xl font-light">Foundation</h4>
                </div>
                <div className="space-y-3 text-amber-700">
                  <p className="pl-6 border-l-2 border-amber-300">
                    <strong>Linux</strong>
                    <span className="block text-sm mt-1">The bedrock of all creation</span>
                  </p>
                  <p className="pl-6 border-l-2 border-amber-300">
                    <strong>Git</strong>
                    <span className="block text-sm mt-1">Time travel for the careful</span>
                  </p>
                  <p className="pl-6 border-l-2 border-amber-300">
                    <strong>VS Code</strong>
                    <span className="block text-sm mt-1">Where thoughts become form</span>
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-amber-800">
                  <Database className="w-8 h-8" />
                  <h4 className="text-xl font-light">Structure</h4>
                </div>
                <div className="space-y-3 text-amber-700">
                  <p className="pl-6 border-l-2 border-amber-300">
                    <strong>Docker</strong>
                    <span className="block text-sm mt-1">Universes in containers</span>
                  </p>
                  <p className="pl-6 border-l-2 border-amber-300">
                    <strong>PostgreSQL</strong>
                    <span className="block text-sm mt-1">Where truth lives in tables</span>
                  </p>
                  <p className="pl-6 border-l-2 border-amber-300">
                    <strong>Ansible</strong>
                    <span className="block text-sm mt-1">Intention made manifest</span>
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-amber-800">
                  <Monitor className="w-8 h-8" />
                  <h4 className="text-xl font-light">Sight</h4>
                </div>
                <div className="space-y-3 text-amber-700">
                  <p className="pl-6 border-l-2 border-amber-300">
                    <strong>Prometheus</strong>
                    <span className="block text-sm mt-1">The all-seeing eye</span>
                  </p>
                  <p className="pl-6 border-l-2 border-amber-300">
                    <strong>Grafana</strong>
                    <span className="block text-sm mt-1">Data becomes beauty</span>
                  </p>
                  <p className="pl-6 border-l-2 border-amber-300">
                    <strong>ELK Stack</strong>
                    <span className="block text-sm mt-1">Logs become wisdom</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center text-amber-800 italic">
              Each tool connects to create something greater.
              <br />
              <span className="font-medium">Like you.</span>
            </div>
          </div>

          <div className="mt-12">
            <AnimatedTerminal 
              commands={[
                'which docker',
                'which dreams',
                'echo "One exists. One you must build."'
              ]}
              output={`/usr/local/bin/docker
dreams: command not found

One exists. One you must build.

The stack is just vocabulary.
You are the poetry.

Tools age. Languages die. Frameworks fade.
But the engineer who understands 'why' 
transcends every 'what'.

Master the principles, not the products.`}
              id="stack-terminal"
            />
          </div>

          <div className="bg-teal-50 p-10 rounded-3xl border border-teal-200">
            <p className="text-teal-900 text-lg leading-relaxed">
              In the military, they issued your equipment.
              <br />
              As an engineer, you choose your weapons.
              <br />
              <span className="font-medium">This is your first act of creation.</span>
            </p>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setDiscoveryStep(3)}
              className="group px-12 py-5 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl font-light text-lg"
            >
              Show Me the Proving Ground
              <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'certification',
      number: '03',
      title: 'The Proving',
      subtitle: 'Paper is worthless until experience gives it weight',
      icon: Award,
      wisdom: 'Certifications open doors. Character keeps them open.',
      content: (
        <div className="space-y-16 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <p className="text-3xl font-light text-gray-700">
              They speak a different language here.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Your ribbons mean nothing. Your clearance, a footnote.
              <br />
              <span className="italic">But these letters—RHCSA, RHCSE—they translate your worth.</span>
            </p>
          </div>

          <div className="space-y-10">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-12 rounded-3xl border-2 border-red-200 relative overflow-hidden">
              <div className="absolute top-6 right-6 text-red-200 text-8xl font-light opacity-20">基</div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <Award className="w-12 h-12 text-red-600" />
                  <div>
                    <h3 className="text-3xl font-light text-red-900">RHCSA</h3>
                    <p className="text-red-700 mt-1">The foundation stone • $400</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-xl font-light text-red-800 mb-4">You Will Learn</h4>
                    <div className="space-y-3 text-red-700">
                      <p className="pl-6 border-l-2 border-red-300">
                        To speak Linux fluently
                        <span className="block text-sm text-red-600 mt-1">File systems, permissions, processes</span>
                      </p>
                      <p className="pl-6 border-l-2 border-red-300">
                        To automate the mundane
                        <span className="block text-sm text-red-600 mt-1">Shell scripts that save hours</span>
                      </p>
                      <p className="pl-6 border-l-2 border-red-300">
                        To troubleshoot like a detective
                        <span className="block text-sm text-red-600 mt-1">Find root causes, not symptoms</span>
                      </p>
                      <p className="pl-6 border-l-2 border-red-300">
                        To secure the kingdom
                        <span className="block text-sm text-red-600 mt-1">SELinux, firewalls, hardening</span>
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-light text-red-800 mb-4">You Will Become</h4>
                    <p className="text-red-700 leading-relaxed">
                      Like learning to read—suddenly the world makes sense.
                      What was mystery becomes muscle memory.
                      <br /><br />
                      <span className="italic">This is where every engineer is born.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-rose-100 p-12 rounded-3xl border-2 border-red-300 relative overflow-hidden">
              <div className="absolute top-6 right-6 text-red-300 text-8xl font-light opacity-20">達</div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <Award className="w-12 h-12 text-red-700" />
                  <div>
                    <h3 className="text-3xl font-light text-red-900">RHCSE</h3>
                    <p className="text-red-800 mt-1">The transformation complete • $400</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-xl font-light text-red-900 mb-4">You Will Master</h4>
                    <div className="space-y-3 text-red-800">
                      <p className="pl-6 border-l-2 border-red-400">
                        Ansible automation
                        <span className="block text-sm text-red-700 mt-1">Infrastructure as code, not clicks</span>
                      </p>
                      <p className="pl-6 border-l-2 border-red-400">
                        Advanced networking
                        <span className="block text-sm text-red-700 mt-1">Bonds, teams, VLANs, and routes</span>
                      </p>
                      <p className="pl-6 border-l-2 border-red-400">
                        System services mastery
                        <span className="block text-sm text-red-700 mt-1">systemd, containers, and beyond</span>
                      </p>
                      <p className="pl-6 border-l-2 border-red-400">
                        Storage architecture
                        <span className="block text-sm text-red-700 mt-1">LVM, Stratis, advanced filesystems</span>
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-light text-red-900 mb-4">You Will Be</h4>
                    <p className="text-red-800 leading-relaxed">
                      No longer a maintainer. No longer a supporter.
                      <br /><br />
                      <span className="font-medium">An engineer.</span>
                      <br /><br />
                      Someone who sees problems before they exist
                      and builds solutions before they're needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-10 rounded-3xl border border-amber-200">
            <h4 className="text-xl font-light text-amber-900 mb-4">The Secret Path</h4>
            <p className="text-amber-800 leading-relaxed">
              If your unit has training funds, pursue the Red Hat Training Subscription.
              Yes, it's expensive. Like good whiskey. Like freedom.
              <br /><br />
              <span className="font-medium">4 exam attempts. 420 hours of hands-on labs. Real experience.</span>
              <br />
              <span className="text-sm mt-2 block">This is how you go from theory to practice without breaking production.</span>
            </p>
          </div>

          <div className="p-10 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl">
            <p className="text-xl text-gray-800 font-light text-center leading-relaxed">
              "If becoming a Red Hat Certified Systems Engineer is your goal, 
              there is only one thing you need to do.
              <br />
              <span className="font-medium">Begin."</span>
            </p>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setDiscoveryStep(4)}
              className="group px-12 py-5 bg-red-700 text-white rounded-2xl hover:bg-red-800 transition-all transform hover:scale-105 shadow-xl font-light text-lg"
            >
              But How Do I Practice War Without a War?
              <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'experience',
      number: '04',
      title: 'The Building',
      subtitle: 'Theory without practice is philosophy',
      icon: Code,
      wisdom: 'A thousand tutorials < one working system',
      content: (
        <div className="space-y-16 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="text-8xl mb-8">🔥</div>
            <p className="text-3xl font-light text-gray-700">
              "Engineering? What the fuck does that even mean?"
            </p>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mt-6">
              It means building bridges where others see cliffs.
              <br />
              Writing symphonies in languages machines understand.
              <br />
              <span className="italic block mt-4">Creating order from chaos, then sharing the blueprint.</span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-3xl border border-blue-200">
            <h3 className="text-2xl font-light text-blue-900 mb-10 text-center">
              From Zero to Creator in Three Acts
            </h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-light text-lg flex-shrink-0">1</span>
                <div className="flex-1">
                  <h4 className="text-xl font-light text-blue-900 mb-2">Plant Your Flag</h4>
                  <p className="text-blue-800">
                    GitHub isn't just version control. It's your proof of existence.
                    <br />
                    Every commit, a heartbeat. Every push, a declaration.
                  </p>
                  <p className="text-blue-600 text-sm mt-2 italic">
                    "Your GitHub is your new DD-214"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-light text-lg flex-shrink-0">2</span>
                <div className="flex-1">
                  <h4 className="text-xl font-light text-blue-900 mb-2">Find Problems Worth Solving</h4>
                  <p className="text-blue-800">
                    Look for what irritates you daily. That's your goldmine.
                    <br />
                    Reddit, YouTube, Stack Overflow—your reconnaissance.
                  </p>
                  <p className="text-blue-600 text-sm mt-2 italic">
                    "If it wastes your time twice, automate it once"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-light text-lg flex-shrink-0">3</span>
                <div className="flex-1">
                  <h4 className="text-xl font-light text-blue-900 mb-2">Translate Impact, Not Activity</h4>
                  <p className="text-blue-800">
                    Stop counting tickets. Start measuring transformation.
                    <br />
                    "I saved 4 hours weekly" beats "I closed 47 tickets."
                  </p>
                  <p className="text-blue-600 text-sm mt-2 italic">
                    "ROI is the only language executives speak"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <AnimatedTerminal 
            commands={[
              'git init my-first-rebellion',
              'cd my-first-rebellion',
              'echo "# The Beginning" > README.md',
              'git add .',
              'git commit -m "feat: First step into the unknown"'
            ]}
            output={`Initialized empty Git repository in my-first-rebellion/.git/

[main (root-commit) abc1234] feat: First step into the unknown
 1 file changed, 1 insertion(+)
 create mode 100644 README.md

Every repository starts empty.
Every expert started here.
Every system that runs the world began with someone typing 'git init'.

Your first project will be terrible.
Ship it anyway.

Perfect is the enemy of deployed.
Done teaches. Perfect procrastinates.

Begin badly. Iterate infinitely.`}
            id="experience-terminal"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <div className="bg-emerald-50 p-10 rounded-3xl border border-emerald-200">
              <h4 className="text-xl font-light text-emerald-900 mb-6">Projects That Teach</h4>
              <div className="space-y-4 text-emerald-800">
                <p className="pl-6 border-l-2 border-emerald-300">
                  <strong>Status Dashboard</strong>
                  <span className="block text-sm mt-1">See everything, everywhere, all at once</span>
                </p>
                <p className="pl-6 border-l-2 border-emerald-300">
                  <strong>Auto-Healer</strong>
                  <span className="block text-sm mt-1">Fix problems while you sleep</span>
                </p>
                <p className="pl-6 border-l-2 border-emerald-300">
                  <strong>Pattern Finder</strong>
                  <span className="block text-sm mt-1">Make logs tell stories</span>
                </p>
                <p className="pl-6 border-l-2 border-emerald-300">
                  <strong>Time Machine</strong>
                  <span className="block text-sm mt-1">Backups that never fail</span>
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-10 rounded-3xl border border-purple-200">
              <h4 className="text-xl font-light text-purple-900 mb-6">Value You Birth</h4>
              <div className="space-y-4 text-purple-800">
                <p className="pl-6 border-l-2 border-purple-300">
                  <strong>Time</strong>
                  <span className="block text-sm mt-1">200 hours returned to life yearly</span>
                </p>
                <p className="pl-6 border-l-2 border-purple-300">
                  <strong>Accuracy</strong>
                  <span className="block text-sm mt-1">Human error becomes myth</span>
                </p>
                <p className="pl-6 border-l-2 border-purple-300">
                  <strong>Scale</strong>
                  <span className="block text-sm mt-1">One becomes one thousand</span>
                </p>
                <p className="pl-6 border-l-2 border-purple-300">
                  <strong>Knowledge</strong>
                  <span className="block text-sm mt-1">Tribal wisdom becomes code</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-200 mt-12">
            <p className="text-xl text-gray-800 font-light leading-relaxed text-center">
              Fall in love with the problem, not the solution.
              <br />
              <span className="font-medium">
                The solution will change. The problem is eternal.
              </span>
            </p>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setDiscoveryStep(5)}
              className="group px-12 py-5 bg-blue-700 text-white rounded-2xl hover:bg-blue-800 transition-all transform hover:scale-105 shadow-xl font-light text-lg"
            >
              Show Me How Teams Really Work
              <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'agile',
      number: '05',
      title: 'The Flow',
      subtitle: 'Agile is jazz, not classical',
      icon: Users,
      wisdom: 'Planning is guessing. Iterating is knowing.',
      content: (
        <div className="space-y-16 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <p className="text-3xl font-light text-gray-700">
              In the military, we planned battles.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              In engineering, we plan for change itself.
              <br />
              <span className="italic block mt-4">
                Because the only constant is that nothing is constant.
              </span>
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-12 rounded-3xl border border-emerald-200">
            <h3 className="text-2xl font-light text-gray-800 mb-10 text-center">
              The Death of the Five-Year Plan
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-light text-emerald-800 mb-6 flex items-center gap-3">
                  <Lock className="w-6 h-6" />
                  Waterfall (How We Used to Build)
                </h4>
                <div className="space-y-4 text-emerald-700">
                  <p className="pl-6 border-l-2 border-emerald-300">
                    Plan everything first
                    <span className="block text-sm text-emerald-600 mt-1">Then watch it crumble</span>
                  </p>
                  <p className="pl-6 border-l-2 border-emerald-300">
                    Build for months
                    <span className="block text-sm text-emerald-600 mt-1">Deploy once, pray harder</span>
                  </p>
                  <p className="pl-6 border-l-2 border-emerald-300">
                    Get feedback at the end
                    <span className="block text-sm text-emerald-600 mt-1">When it's too late to matter</span>
                  </p>
                  <p className="pl-6 border-l-2 border-emerald-300">
                    Change is the enemy
                    <span className="block text-sm text-emerald-600 mt-1">Requirements carved in stone</span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-light text-teal-800 mb-6 flex items-center gap-3">
                  <GitBranch className="w-6 h-6" />
                  Agile (How We Flow)
                </h4>
                <div className="space-y-4 text-teal-700">
                  <p className="pl-6 border-l-2 border-teal-300">
                    Plan the next step
                    <span className="block text-sm text-teal-600 mt-1">See further when you get there</span>
                  </p>
                  <p className="pl-6 border-l-2 border-teal-300">
                    Ship every sprint
                    <span className="block text-sm text-teal-600 mt-1">Fail fast, fix faster</span>
                  </p>
                  <p className="pl-6 border-l-2 border-teal-300">
                    Feedback is fuel
                    <span className="block text-sm text-teal-600 mt-1">Course correct constantly</span>
                  </p>
                  <p className="pl-6 border-l-2 border-teal-300">
                    Change is the way
                    <span className="block text-sm text-teal-600 mt-1">Embrace the pivot</span>
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-700 mt-10 text-lg italic">
              No plan survives first contact with reality.
              <br />
              <span className="font-medium">So we plan to adapt.</span>
            </p>
          </div>

          <div className="space-y-10 mt-12">
            <h3 className="text-2xl font-light text-gray-800 text-center">
              The Holy Trinity of Getting Shit Done
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-10 rounded-3xl border border-blue-200">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-10 h-10 text-blue-600" />
                  <h4 className="text-xl font-light text-blue-900">Jira</h4>
                </div>
                <p className="text-blue-800 mb-4">Where chaos finds order</p>
                <div className="space-y-3 text-blue-700 text-sm">
                  <p>• Stories replace orders</p>
                  <p>• Sprints replace campaigns</p>
                  <p>• Points replace ranks</p>
                  <p>• Done beats perfect</p>
                </div>
                <p className="text-blue-600 text-xs mt-6 italic">
                  "If it's not in Jira, it doesn't exist"
                </p>
              </div>

              <div className="bg-green-50 p-10 rounded-3xl border border-green-200">
                <div className="flex items-center gap-3 mb-6">
                  <Database className="w-10 h-10 text-green-600" />
                  <h4 className="text-xl font-light text-green-900">Confluence</h4>
                </div>
                <p className="text-green-800 mb-4">Where knowledge becomes immortal</p>
                <div className="space-y-3 text-green-700 text-sm">
                  <p>• Decisions documented</p>
                  <p>• Wisdom preserved</p>
                  <p>• Onboarding automated</p>
                  <p>• Context captured</p>
                </div>
                <p className="text-green-600 text-xs mt-6 italic">
                  "The team's collective brain"
                </p>
              </div>

              <div className="bg-purple-50 p-10 rounded-3xl border border-purple-200">
                <div className="flex items-center gap-3 mb-6">
                  <GitBranch className="w-10 h-10 text-purple-600" />
                  <h4 className="text-xl font-light text-purple-900">Git</h4>
                </div>
                <p className="text-purple-800 mb-4">Where code tells its story</p>
                <div className="space-y-3 text-purple-700 text-sm">
                  <p>• Every change tracked</p>
                  <p>• Every decision reversible</p>
                  <p>• Every author known</p>
                  <p>• Every branch a possibility</p>
                </div>
                <p className="text-purple-600 text-xs mt-6 italic">
                  "Time travel for code"
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-10 rounded-3xl border border-amber-200 mt-12">
            <p className="text-xl text-amber-900 font-light leading-relaxed">
              Planning should be iterative with the discovery process itself.
              <br />
              Voice your doubts. Question requirements. Challenge assumptions.
              <br /><br />
              <span className="font-medium">
                Suddenly there are no blockers.
                No busy work.
                Just building.
              </span>
            </p>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setDiscoveryStep(6)}
              className="group px-12 py-5 bg-emerald-700 text-white rounded-2xl hover:bg-emerald-800 transition-all transform hover:scale-105 shadow-xl font-light text-lg"
            >
              Show Me How to See in the Dark
              <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'monitoring',
      number: '06',
      title: 'The Eyes',
      subtitle: 'You can\'t fix what you can\'t see',
      icon: Monitor,
      wisdom: 'Monitoring shows the what. Observability reveals the why.',
      content: (
        <div className="space-y-16 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <p className="text-3xl font-light text-gray-700">
              In combat, situational awareness keeps you alive.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              In engineering, observability keeps your systems alive.
              <br />
              <span className="italic block mt-4">
                The difference? Systems whisper their problems before they scream.
              </span>
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-light text-gray-800 mb-10 text-center">
              The Three Pillars of Truth
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-orange-50 p-10 rounded-3xl border border-orange-200 transform hover:scale-105 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <Monitor className="w-10 h-10 text-orange-600" />
                  <h4 className="text-xl font-light text-orange-900">Logs</h4>
                </div>
                <p className="text-orange-800 mb-4 italic">What happened</p>
                <div className="space-y-3 text-orange-700">
                  <p className="text-sm">
                    <strong>ELK Stack</strong>
                    <span className="block mt-1">Every event, remembered</span>
                    <span className="block">Every error, explained</span>
                    <span className="block">Every pattern, revealed</span>
                  </p>
                </div>
                <p className="text-orange-600 text-xs mt-6 italic">
                  "The system's diary"
                </p>
              </div>

              <div className="bg-red-50 p-10 rounded-3xl border border-red-200 transform hover:scale-105 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-10 h-10 text-red-600" />
                  <h4 className="text-xl font-light text-red-900">Metrics</h4>
                </div>
                <p className="text-red-800 mb-4 italic">How it's feeling</p>
                <div className="space-y-3 text-red-700">
                  <p className="text-sm">
                    <strong>Prometheus</strong>
                    <span className="block mt-1">Numbers never lie</span>
                    <span className="block">Trends never hide</span>
                    <span className="block">Alerts never sleep</span>
                  </p>
                </div>
                <p className="text-red-600 text-xs mt-6 italic">
                  "The system's heartbeat"
                </p>
              </div>

              <div className="bg-purple-50 p-10 rounded-3xl border border-purple-200 transform hover:scale-105 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <Database className="w-10 h-10 text-purple-600" />
                  <h4 className="text-xl font-light text-purple-900">Traces</h4>
                </div>
                <p className="text-purple-800 mb-4 italic">Where it went</p>
                <div className="space-y-3 text-purple-700">
                  <p className="text-sm">
                    <strong>Grafana</strong>
                    <span className="block mt-1">Data becomes art</span>
                    <span className="block">Complexity becomes clear</span>
                    <span className="block">Invisible becomes obvious</span>
                  </p>
                </div>
                <p className="text-purple-600 text-xs mt-6 italic">
                  "The system's journey"
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-12 rounded-3xl border border-orange-200 mb-12">
            <h3 className="text-2xl font-light text-orange-900 mb-8 text-center">
              The ELK Trinity: Where Logs Become Wisdom
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Database className="w-8 h-8 text-orange-600" />
                  <h4 className="text-xl font-light text-orange-800">Elasticsearch</h4>
                </div>
                <p className="text-orange-700 italic">The memory palace</p>
                <p className="text-orange-600 text-sm leading-relaxed">
                  Billions of logs, searchable in milliseconds.
                  <br />
                  What took hours of grep now takes seconds of query.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Wrench className="w-8 h-8 text-orange-600" />
                  <h4 className="text-xl font-light text-orange-800">Logstash</h4>
                </div>
                <p className="text-orange-700 italic">The alchemist</p>
                <p className="text-orange-600 text-sm leading-relaxed">
                  Raw logs transformed into structured data.
                  <br />
                  Chaos becomes order, noise becomes signal.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Monitor className="w-8 h-8 text-orange-600" />
                  <h4 className="text-xl font-light text-orange-800">Kibana</h4>
                </div>
                <p className="text-orange-700 italic">The oracle</p>
                <p className="text-orange-600 text-sm leading-relaxed">
                  Dashboards that tell stories.
                  <br />
                  Where patterns emerge from the darkness.
                </p>
              </div>
            </div>

            <p className="text-center text-orange-800 mt-10 text-lg italic">
              Together, they turn your system's whispers into shouts.
              <br />
              <span className="font-medium">Never be blind again.</span>
            </p>
          </div>

          <AnimatedTerminal 
            commands={[
              'docker-compose up -d monitoring',
              'curl http://localhost:9090/metrics',
              'echo "Now you see everything"'
            ]}
            output={`Creating monitoring_prometheus_1     ... done
Creating monitoring_grafana_1        ... done  
Creating monitoring_alertmanager_1   ... done

# HELP up Was the last scrape successful.
# TYPE up gauge
up{job="prometheus",instance="localhost:9090"} 1

Now you see everything

Before monitoring: "The server is slow"
After monitoring: "API latency increased 47% at 3:47 AM 
when the batch job competed for CPU with the web tier"

This is the difference between guessing and knowing.
Between reacting and preventing.
Between amateur and engineer.`}
            id="monitoring-terminal"
          />

          <div className="bg-blue-50 p-12 rounded-3xl border border-blue-200 mt-12">
            <h3 className="text-2xl font-light text-blue-900 mb-8 text-center">
              The Automation Symphony
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h4 className="text-xl font-light text-blue-800 mb-4 flex items-center gap-3">
                  <Cpu className="w-6 h-6" />
                  Ansible
                </h4>
                <p className="text-blue-700 mb-4 italic">When repetition becomes rhythm</p>
                <div className="space-y-3 text-blue-600 text-sm">
                  <p className="pl-6 border-l-2 border-blue-300">
                    Declare the desired state
                    <span className="block text-xs mt-1">Reality conforms</span>
                  </p>
                  <p className="pl-6 border-l-2 border-blue-300">
                    Run once or a thousand times
                    <span className="block text-xs mt-1">Same result</span>
                  </p>
                  <p className="pl-6 border-l-2 border-blue-300">
                    No agents, just SSH
                    <span className="block text-xs mt-1">Simple is sustainable</span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-light text-blue-800 mb-4 flex items-center gap-3">
                  <GitBranch className="w-6 h-6" />
                  Jenkins
                </h4>
                <p className="text-blue-700 mb-4 italic">When pipelines become poetry</p>
                <div className="space-y-3 text-blue-600 text-sm">
                  <p className="pl-6 border-l-2 border-blue-300">
                    Code to production
                    <span className="block text-xs mt-1">In minutes, not meetings</span>
                  </p>
                  <p className="pl-6 border-l-2 border-blue-300">
                    Tests run themselves
                    <span className="block text-xs mt-1">Quality automated</span>
                  </p>
                  <p className="pl-6 border-l-2 border-blue-300">
                    Deploy without fear
                    <span className="block text-xs mt-1">Rollback without tears</span>
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-blue-800 mt-10 text-lg italic">
              Do you love automating and troubleshooting?
              <br />
              <span className="font-medium">This is DevOps. This is freedom.</span>
            </p>
          </div>

          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-200 mt-12">
            <p className="text-xl text-gray-800 font-light leading-relaxed text-center">
              Monitoring without action is just sophisticated worrying.
              <br />
              <span className="font-medium">
                Build systems that heal themselves.
              </span>
            </p>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setDiscoveryStep(7)}
              className="group px-12 py-5 bg-purple-700 text-white rounded-2xl hover:bg-purple-800 transition-all transform hover:scale-105 shadow-xl font-light text-lg"
            >
              Show Me Where This Path Leads
              <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'paths',
      number: '07',
      title: 'The Branches',
      subtitle: 'Three rivers from one source',
      icon: Compass,
      wisdom: 'Choose based on who you wish to become, not what you wish to earn',
      content: (
        <div className="space-y-16 max-w-5xl mx-auto">
          <div className="text-center space-y-6">
            <p className="text-3xl font-light text-gray-700">
              The foundation is built. Now specialize.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Each path leads to mastery, but through different terrain.
              <br />
              <span className="italic block mt-4">
                The best engineers eventually become all three.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-10 rounded-3xl border-2 border-blue-200 hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <GitBranch className="w-10 h-10 text-blue-600" />
                <h3 className="text-xl font-light text-blue-900">DevOps</h3>
              </div>
              <p className="text-blue-800 mb-6 italic">
                The bridge builder
              </p>
              
              <div className="space-y-4 text-blue-700 mb-8">
                <p className="text-sm">Code flows like water</p>
                <p className="text-sm">Deployment becomes meditation</p>
                <p className="text-sm">Automation is your religion</p>
                <p className="text-sm">Downtime is your nightmare</p>
              </div>
              
              <div className="border-t border-blue-200 pt-6">
                <p className="text-2xl font-light text-blue-900">$90-150k</p>
                <p className="text-xs text-blue-600 mt-2">Plus the peace of sleeping soundly</p>
              </div>
            </div>

            <div className="bg-red-50 p-10 rounded-3xl border-2 border-red-200 hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-10 h-10 text-red-600" />
                <h3 className="text-xl font-light text-red-900">SecDevOps</h3>
              </div>
              <p className="text-red-800 mb-6 italic">
                The guardian
              </p>
              
              <div className="space-y-4 text-red-700 mb-8">
                <p className="text-sm">Your 35T past is your power</p>
                <p className="text-sm">Security woven, not bolted on</p>
                <p className="text-sm">Compliance becomes code</p>
                <p className="text-sm">Zero trust, infinite verify</p>
              </div>
              
              <div className="border-t border-red-200 pt-6">
                <p className="text-2xl font-light text-red-900">$100-170k</p>
                <p className="text-xs text-red-600 mt-2">Plus knowing you prevented catastrophe</p>
              </div>
            </div>

            <div className="bg-green-50 p-10 rounded-3xl border-2 border-green-200 hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-10 h-10 text-green-600" />
                <h3 className="text-xl font-light text-green-900">Infrastructure</h3>
              </div>
              <p className="text-green-800 mb-6 italic">
                The architect
              </p>
              
              <div className="space-y-4 text-green-700 mb-8">
                <p className="text-sm">Think in systems, not servers</p>
                <p className="text-sm">Scale excites you</p>
                <p className="text-sm">Design for failure</p>
                <p className="text-sm">Build digital cities</p>
              </div>
              
              <div className="border-t border-green-200 pt-6">
                <p className="text-2xl font-light text-green-900">$95-160k</p>
                <p className="text-xs text-green-600 mt-2">Plus the joy of building worlds</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-12 rounded-3xl border border-purple-200 mt-12">
            <h3 className="text-2xl font-light text-purple-900 mb-8 text-center">
              The Complete Engineer: Master of All Domains
            </h3>
            
            <p className="text-purple-800 text-lg leading-relaxed mb-8 text-center max-w-3xl mx-auto">
              Where all paths converge. Where titles become meaningless.
              <br />
              <span className="italic">You are simply: The Engineer.</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h4 className="text-xl font-light text-purple-800 mb-4">The Philosophy</h4>
                <p className="text-purple-700 leading-relaxed">
                  You build. You secure. You scale.
                  <br />
                  You see systems, not servers.
                  <br />
                  You prevent problems before they exist.
                  <br /><br />
                  Infrastructure is your canvas.
                  <br />
                  Automation is your brush.
                  <br />
                  Reliability is your masterpiece.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-light text-purple-800 mb-4">The Reality</h4>
                <p className="text-purple-700 leading-relaxed">
                  No longer DevOps or SecDevOps or Infrastructure.
                  <br />
                  You are all three. You are none.
                  <br />
                  You are what the problem needs you to be.
                  <br /><br />
                  Systems Administrator? That was kindergarten.
                  <br />
                  This is graduate school.
                </p>
                <div className="mt-6 p-6 bg-purple-100 rounded-2xl">
                  <p className="text-2xl font-light text-purple-900">Beyond salary</p>
                  <p className="text-sm text-purple-700 mt-2">
                    You write your own checks.
                    <br />
                    <span className="font-medium">Because you create value others can't imagine.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-200 mt-12">
            <p className="text-xl text-gray-800 font-light leading-relaxed text-center">
              DevOps. SecDevOps. Infrastructure.
              <br />
              <span className="font-medium">
                Labels for the same truth: You build what matters.
              </span>
            </p>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setDiscoveryStep(8)}
              className="group px-12 py-5 bg-green-700 text-white rounded-2xl hover:bg-green-800 transition-all transform hover:scale-105 shadow-xl font-light text-lg"
            >
              What Separates Good from Great?
              <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'senior',
      number: '08',
      title: 'The Becoming',
      subtitle: 'Senior is not years served but wisdom shared',
      icon: Users,
      wisdom: 'The master has failed more times than the beginner has tried',
      content: (
        <div className="space-y-16 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="text-8xl mb-8">∞</div>
            <p className="text-3xl font-light text-gray-700">
              What makes a senior engineer?
            </p>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Not the ability to parse repos at godspeed.
              <br />
              Not knowing seventeen ways to exit vim.
              <br />
              <span className="italic block mt-4">
                Something far simpler. Far harder.
              </span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-3xl border border-blue-200">
            <h3 className="text-3xl font-light text-blue-900 mb-10 text-center">
              Communication Is Everything
            </h3>
            
            <p className="text-xl text-blue-800 leading-relaxed text-center mb-12 max-w-3xl mx-auto">
              The single defining factor that separates senior from junior.
              <br />
              <span className="font-medium">Not code. Communication.</span>
            </p>
            
            <div className="space-y-10">
              <div className="border-l-4 border-blue-400 pl-8">
                <h4 className="text-xl font-light text-blue-900 mb-3">Open Channels</h4>
                <p className="text-blue-700 leading-relaxed">
                  Share your struggles. Everyone struggles.
                  <br />
                  Share your solutions. Multiply their impact.
                  <br />
                  Share your questions. Wisdom begins with "I don't know."
                </p>
              </div>

              <div className="border-l-4 border-green-400 pl-8">
                <h4 className="text-xl font-light text-green-900 mb-3">Humble Growth</h4>
                <p className="text-green-700 leading-relaxed">
                  Everyone knows nothing. Especially those who think they know everything.
                  <br />
                  Stay curious. Stay humble. Stay human.
                  <br />
                  The moment you stop learning is the moment you start dying.
                </p>
              </div>

              <div className="border-l-4 border-purple-400 pl-8">
                <h4 className="text-xl font-light text-purple-900 mb-3">Death of Ego</h4>
                <p className="text-purple-700 leading-relaxed">
                  The military taught competition. Engineering teaches collaboration.
                  <br />
                  Your strength isn't in being better than others.
                  <br />
                  <span className="font-medium">It's in making others better.</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-red-50 p-10 rounded-3xl border border-red-200">
              <h4 className="text-xl font-light text-red-900 mb-6 flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                Junior Patterns
              </h4>
              <div className="space-y-4 text-red-700">
                <p className="pl-6 border-l-2 border-red-300">
                  Works alone
                  <span className="block text-sm text-red-600 mt-1">"I'll figure it out"</span>
                </p>
                <p className="pl-6 border-l-2 border-red-300">
                  Hoards knowledge
                  <span className="block text-sm text-red-600 mt-1">"Job security"</span>
                </p>
                <p className="pl-6 border-l-2 border-red-300">
                  Fears looking stupid
                  <span className="block text-sm text-red-600 mt-1">"I should know this"</span>
                </p>
                <p className="pl-6 border-l-2 border-red-300">
                  Focuses on the how
                  <span className="block text-sm text-red-600 mt-1">"Look at my clever code"</span>
                </p>
                <p className="pl-6 border-l-2 border-red-300">
                  Defends territory
                  <span className="block text-sm text-red-600 mt-1">"That's my component"</span>
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-10 rounded-3xl border border-green-200">
              <h4 className="text-xl font-light text-green-900 mb-6 flex items-center gap-3">
                <span className="text-2xl">🌊</span>
                Senior Flow
              </h4>
              <div className="space-y-4 text-green-700">
                <p className="pl-6 border-l-2 border-green-300">
                  Collaborates openly
                  <span className="block text-sm text-green-600 mt-1">"Let's solve this together"</span>
                </p>
                <p className="pl-6 border-l-2 border-green-300">
                  Teaches constantly
                  <span className="block text-sm text-green-600 mt-1">"Let me show you why"</span>
                </p>
                <p className="pl-6 border-l-2 border-green-300">
                  Embraces not knowing
                  <span className="block text-sm text-green-600 mt-1">"Great question, let's find out"</span>
                </p>
                <p className="pl-6 border-l-2 border-green-300">
                  Focuses on the why
                  <span className="block text-sm text-green-600 mt-1">"What problem are we solving?"</span>
                </p>
                <p className="pl-6 border-l-2 border-green-300">
                  Builds bridges
                  <span className="block text-sm text-green-600 mt-1">"How can I help?"</span>
                </p>
              </div>
            </div>
          </div>

          <AnimatedTerminal 
            commands={[
              'git log --oneline --graph --all',
              'echo "Every commit tells a story"',
              'echo "Every PR teaches"',
              'echo "Every review builds trust"'
            ]}
            output={`* a1b2c3d (HEAD -> main) feat: Add self-healing to prod
* d4e5f6g fix: Resolve race condition others missed
* g7h8i9j docs: Explain the why, not just the what
* j1k2l3m refactor: Make complex simple
* m4n5o6p mentor: Helped junior find the solution

Every commit tells a story
Every PR teaches
Every review builds trust

Senior engineers don't just write code.
They write the future.
They build the culture.
They create the environment where others thrive.

Your code will be replaced.
Your systems will be rebuilt.
But the engineers you help grow?
That's your real legacy.`}
            id="senior-terminal"
          />

          <div className="bg-amber-50 p-10 rounded-3xl border border-amber-200 mt-12">
            <h4 className="text-xl font-light text-amber-900 mb-4">The Secret</h4>
            <p className="text-amber-800 leading-relaxed">
              Abstract yourself from engineering.
              <br />
              Think as product owner, engineer, customer, maintainer.
              <br /><br />
              <span className="font-medium">
                See the system, not just the code.
                <br />
                See the human, not just the engineer.
                <br />
                See the journey, not just the destination.
              </span>
            </p>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-12 rounded-3xl mt-12">
            <p className="text-2xl text-gray-800 font-light text-center leading-relaxed">
              From junior to senior is not measured in years.
              <br />
              <span className="font-medium">
                It's measured in moments of choosing collaboration over competition,
                <br />
                teaching over hoarding,
                <br />
                and growth over comfort.
              </span>
            </p>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setCurrentPhase(2)}
              className="group px-12 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-xl font-light text-lg"
            >
              I'm Ready to Build
              <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )
    }
  ];

  const currentChapter = discoveryChapters[discoveryStep] || discoveryChapters[0];

  // Laboratory Phase - where theory becomes practice
  const LabPhase = () => {
    const labSteps = [
      {
        id: 'environment',
        title: 'Choose Your Forge',
        content: (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <p className="text-3xl font-light text-gray-700">
                Every master craftsman needs a workshop.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                Yours begins with choosing your foundation.
                <br />
                <span className="italic">The tools matter less than what you build with them.</span>
              </p>
            </div>

            <div className="mt-12">
              <p className="text-lg text-gray-700 mb-8">Which reality do you inhabit?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <button
                  onClick={() => {
                    setOsType('mac');
                    setLabSetupStep(1);
                    setCompletedSteps({...completedSteps, 'environment': true});
                  }}
                  className="group p-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-gray-200 hover:border-gray-400 transition-all"
                >
                  <div className="text-6xl mb-4">🍎</div>
                  <h3 className="text-xl font-light text-gray-800">macOS</h3>
                  <p className="text-gray-600 mt-2">Unix heritage, polished present</p>
                  <p className="text-sm text-gray-500 mt-4 group-hover:text-gray-700 transition-colors">
                    Where elegance meets engineering
                  </p>
                </button>

                <button
                  onClick={() => {
                    setOsType('windows');
                    setLabSetupStep(1);
                    setCompletedSteps({...completedSteps, 'environment': true});
                  }}
                  className="group p-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-gray-200 hover:border-gray-400 transition-all"
                >
                  <div className="text-6xl mb-4">🪟</div>
                  <h3 className="text-xl font-light text-gray-800">Windows</h3>
                  <p className="text-gray-600 mt-2">Enterprise standard, Linux soul</p>
                  <p className="text-sm text-gray-500 mt-4 group-hover:text-gray-700 transition-colors">
                    WSL2 bridges two worlds
                  </p>
                </button>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'github',
        title: 'Claim Your Digital Name',
        content: (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <p className="text-3xl font-light text-gray-700">
                In the beginning was the username.
              </p>
              <p className="text-xl text-gray-600">
                And the username was you.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-3xl border border-gray-200">
              <h3 className="text-xl font-light text-gray-800 mb-8">The Naming Ceremony</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <span className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center font-light text-lg flex-shrink-0">1</span>
                  <div className="flex-1">
                    <p className="text-lg text-gray-800 mb-2">Journey to the Source</p>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline inline-flex items-center gap-2 hover:text-emerald-800">
                      github.com <ExternalLink className="w-4 h-4" />
                    </a>
                    <p className="text-gray-600 mt-2">Your professional rebirth begins here.</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <span className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center font-light text-lg flex-shrink-0">2</span>
                  <div className="flex-1">
                    <p className="text-lg text-gray-800 mb-2">Choose Wisely</p>
                    <p className="text-gray-600">Your handle becomes your brand. Make it timeless.</p>
                    <p className="text-sm text-gray-500 mt-2 italic">
                      ❌ xXCyberWarrior2024Xx
                      <br />
                      ✅ jsmith or johnsmith-dev
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <span className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center font-light text-lg flex-shrink-0">3</span>
                  <div className="flex-1">
                    <p className="text-lg text-gray-800 mb-2">Verify Your Existence</p>
                    <p className="text-gray-600">The email confirmation is your digital birth certificate.</p>
                  </div>
                </div>
              </div>
            </div>

            <AnimatedTerminal 
              commands={[
                'git config --global user.name "Your Real Name"',
                'git config --global user.email "you@example.com"',
                'git config --global init.defaultBranch main'
              ]}
              output={`Configuring Git for Your Real Name...
✓ Global identity established
✓ Email linked to commits
✓ Modern branch naming adopted

You are no longer anonymous.
Every line you write carries your name.
Every commit adds to your story.

This is accountability. This is ownership.
This is engineering.`}
              id="github-terminal"
            />

            <button
              onClick={() => {
                setLabSetupStep(2);
                setCompletedSteps({...completedSteps, 'github': true});
              }}
              className="w-full px-10 py-5 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 font-light text-lg"
            >
              I Have Claimed My Name
              <CheckCircle className="w-5 h-5" />
            </button>
          </div>
        )
      },
      {
        id: 'fork',
        title: 'The Sacred Fork',
        content: (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <p className="text-3xl font-light text-gray-700">
                You don't build from nothing.
              </p>
              <p className="text-xl text-gray-600">
                You build on the shoulders of giants.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-10 rounded-3xl border border-amber-200">
              <h3 className="text-xl font-light text-amber-900 mb-8">The Inheritance Ritual</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-light text-lg flex-shrink-0">1</div>
                  <div className="flex-1">
                    <p className="text-lg text-amber-900 mb-2">Find the Source</p>
                    <a href="https://github.com/orionramey/contextus" target="_blank" rel="noopener noreferrer" 
                       className="text-amber-700 underline inline-flex items-center gap-2 hover:text-amber-800">
                      github.com/orionramey/contextus <ExternalLink className="w-4 h-4" />
                    </a>
                    <p className="text-amber-700 mt-2">My laboratory becomes yours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-light text-lg flex-shrink-0">2</div>
                  <div className="flex-1">
                    <p className="text-lg text-amber-900 mb-2">Fork the Knowledge</p>
                    <p className="text-amber-700">Click "Fork" in the top right. Create your own universe.</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-light text-lg flex-shrink-0">3</div>
                  <div className="flex-1">
                    <p className="text-lg text-amber-900 mb-2">Honor the Source</p>
                    <p className="text-amber-700">Keep the name. Add your magic later.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-amber-100 rounded-2xl">
                <p className="text-amber-900 italic">
                  In forking, you join a lineage.
                  <br />
                  <span className="font-medium">Break everything. That's how you learn.</span>
                </p>
              </div>
            </div>

            <AnimatedTerminal 
              commands={['git remote -v']}
              output={`origin    https://github.com/YOUR_USERNAME/contextus.git (fetch)
origin    https://github.com/YOUR_USERNAME/contextus.git (push)
upstream  https://github.com/orionramey/contextus.git (fetch)
upstream  https://github.com/orionramey/contextus.git (push)

Two remotes. Two truths.
'origin' - Your playground, your rules.
'upstream' - The source, the teacher.

This is how open source works.
Take. Transform. Give back.`}
              id="fork-terminal"
            />

            <button
              onClick={() => {
                setLabSetupStep(3);
                setCompletedSteps({...completedSteps, 'fork': true});
              }}
              className="w-full px-10 py-5 bg-amber-700 text-white rounded-2xl hover:bg-amber-800 transition-all flex items-center justify-center gap-3 font-light text-lg"
            >
              I Have Forked My Future
              <GitBranch className="w-5 h-5" />
            </button>
          </div>
        )
      },
      {
        id: 'local',
        title: 'Summon Your Tools',
        content: (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <p className="text-3xl font-light text-gray-700">
                From the cloud to your machine.
              </p>
              <p className="text-xl text-gray-600">
                Make the ethereal tangible.
              </p>
            </div>

            {osType === 'mac' ? (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-3xl border border-gray-200">
                  <h3 className="text-xl font-light text-gray-800 mb-8">The macOS Incantations</h3>
                  
                  <div className="space-y-10">
                    <div>
                      <h4 className="text-lg text-gray-800 mb-4">1. The Package Oracle</h4>
                      <div className="bg-gray-900 text-gray-300 p-6 rounded-2xl font-mono text-sm overflow-x-auto">
                        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
                      </div>
                      <p className="text-gray-600 text-sm mt-3">Homebrew: Where all good tools are born.</p>
                    </div>

                    <div>
                      <h4 className="text-lg text-gray-800 mb-4">2. The Essential Trinity</h4>
                      <div className="bg-gray-900 text-gray-300 p-6 rounded-2xl font-mono text-sm">
                        brew install git<br />
                        brew install --cask docker
                      </div>
                      <p className="text-gray-600 text-sm mt-3">Version control and universe creation.</p>
                    </div>

                    <div>
                      <h4 className="text-lg text-gray-800 mb-4">3. Awaken the Whale</h4>
                      <p className="text-gray-700">Launch Docker Desktop. Watch the containers come alive.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-3xl border border-gray-200">
                  <h3 className="text-xl font-light text-gray-800 mb-8">The Windows Transformation</h3>
                  
                  <div className="space-y-10">
                    <div>
                      <h4 className="text-lg text-gray-800 mb-4">1. Linux Within Windows</h4>
                      <div className="bg-gray-900 text-gray-300 p-6 rounded-2xl font-mono text-sm">
                        wsl --install
                      </div>
                      <p className="text-gray-600 text-sm mt-3">Run as Administrator. Bridge two worlds.</p>
                    </div>

                    <div>
                      <h4 className="text-lg text-gray-800 mb-4">2. The Tool Collection</h4>
                      <p className="text-gray-700 mb-3">Download your weapons:</p>
                      <div className="space-y-2">
                        <a href="https://git-scm.com/download/windows" target="_blank" rel="noopener noreferrer" 
                           className="text-blue-700 underline inline-flex items-center gap-2">
                          Git for Windows <ExternalLink className="w-4 h-4" />
                        </a>
                        <br />
                        <a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noopener noreferrer" 
                           className="text-blue-700 underline inline-flex items-center gap-2">
                          Docker Desktop <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg text-gray-800 mb-4">3. Restart and Rise</h4>
                      <p className="text-gray-700">Reboot. Return with Linux in your veins.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <AnimatedTerminal 
              commands={[
                'docker --version',
                'git --version',
                'echo "The laboratory awaits..."'
              ]}
              output={`Docker version 24.0.7, build afdd53b
Git version 2.42.0
The laboratory awaits...

Your tools are ready.
Your foundation is set.

Now comes the moment of truth.
From nothing, create everything.`}
              id="local-terminal"
            />

            <div className="bg-amber-50 p-8 rounded-3xl border border-amber-200">
              <p className="text-amber-800 italic">
                Docker Desktop democratizes infrastructure.
                <br />
                <span className="font-medium">What once required kernel mastery now requires only curiosity.</span>
              </p>
            </div>

            <button
              onClick={() => {
                setLabSetupStep(4);
                setCompletedSteps({...completedSteps, 'local': true});
              }}
              className="w-full px-10 py-5 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 font-light text-lg"
            >
              My Arsenal Is Complete
              <Package className="w-5 h-5" />
            </button>
          </div>
        )
      },
      {
        id: 'clone',
        title: 'Birth Your Universe',
        content: (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <p className="text-3xl font-light text-gray-700">
                Three commands.
              </p>
              <p className="text-xl text-gray-600">
                From void to running system.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-10 rounded-3xl border border-emerald-200">
              <h3 className="text-xl font-light text-emerald-900 mb-10">The Creation Sequence</h3>
              
              <div className="space-y-10">
                <div>
                  <h4 className="text-lg text-emerald-800 mb-4 flex items-center gap-3">
                    <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                    Pull Your Universe Local
                  </h4>
                  <div className="bg-gray-900 text-gray-300 p-6 rounded-2xl font-mono text-sm overflow-x-auto">
                    git clone https://github.com/YOUR_USERNAME/contextus.git<br />
                    cd contextus
                  </div>
                  <p className="text-emerald-700 text-sm mt-3">Replace YOUR_USERNAME. Make it yours.</p>
                </div>

                <div>
                  <h4 className="text-lg text-emerald-800 mb-4 flex items-center gap-3">
                    <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                    Breathe Life Into Containers
                  </h4>
                  <div className="bg-gray-900 text-gray-300 p-6 rounded-2xl font-mono text-sm">
                    docker-compose up -d
                  </div>
                  <p className="text-emerald-700 text-sm mt-3">Watch as services spring to life.</p>
                </div>

                <div>
                  <h4 className="text-lg text-emerald-800 mb-4 flex items-center gap-3">
                    <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
                    Witness Your Creation
                  </h4>
                  <div className="bg-gray-900 text-gray-300 p-6 rounded-2xl font-mono text-sm">
                    docker ps
                  </div>
                  <p className="text-emerald-700 text-sm mt-3">Behold your running universe.</p>
                </div>
              </div>
            </div>

            <AnimatedTerminal 
              commands={[
                'git clone https://github.com/YOUR_USERNAME/contextus.git',
                'cd contextus',
                'docker-compose up -d'
              ]}
              output={`Cloning into 'contextus'...
remote: Enumerating objects: 73, done.
Receiving objects: 100% (73/73), 28.41 KiB | 2.84 MiB/s, done.

Creating network "contextus_monitoring" with driver "bridge"
Creating volume "contextus_postgres_data" with default driver
Creating volume "contextus_prometheus_data" with default driver
Creating volume "contextus_grafana_data" with default driver

Creating contextus_postgres_1    ... done
Creating contextus_prometheus_1  ... done
Creating contextus_grafana_1     ... done

✓ PostgreSQL breathes on port 5432
✓ Prometheus sees all on port 9090  
✓ Grafana paints beauty on port 3000

Your laboratory is alive.
Your education begins now.

Break things. Fix them. Learn.
This is the way.`}
              id="clone-terminal"
            />

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-10 rounded-3xl border border-green-200">
              <h3 className="text-xl font-light text-green-900 mb-6">🎉 Victory</h3>
              <p className="text-green-800 leading-relaxed mb-6">
                You did it. A complete stack runs on your machine.
                <br />
                <span className="font-medium">This is YOUR laboratory now.</span>
              </p>
              
              <div className="space-y-4 text-green-700">
                <p className="font-medium mb-2">Your Living Services:</p>
                <div className="space-y-2 text-sm">
                  <p>→ <strong>PostgreSQL:</strong> <code className="bg-green-100 px-2 py-1 rounded">localhost:5432</code> (postgres/mysecret)</p>
                  <p>→ <strong>Prometheus:</strong> <a href="http://localhost:9090" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">http://localhost:9090</a></p>
                  <p>→ <strong>Grafana:</strong> <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">http://localhost:3000</a> (admin/admin)</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-8 rounded-3xl border border-amber-200">
              <p className="text-amber-800 font-light text-lg">
                Now the real learning begins.
                <br />
                <span className="font-medium">
                  Every error is a teacher.
                  <br />
                  Every fix is growth.
                  <br />
                  Every rebuild is rebirth.
                </span>
              </p>
            </div>

            <button
              onClick={() => {
                setCompletedSteps({...completedSteps, 'clone': true});
                setCurrentPhase(3);
              }}
              className="w-full px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-3 font-light text-lg"
            >
              I Am Ready for Community
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )
      }
    ];

    const currentLabStep = labSteps[labSetupStep];

    return (
      <div className="space-y-12">
        {/* Progress indicator */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-lg font-light text-gray-800 mb-6">Your Journey Through the Laboratory</h3>
          <div className="space-y-4">
            {labSteps.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-4">
                {completedSteps[step.id] ? (
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                ) : idx === labSetupStep ? (
                  <Circle className="w-6 h-6 text-amber-600 animate-pulse" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300" />
                )}
                <span className={`text-lg ${
                  completedSteps[step.id] 
                    ? 'text-emerald-700' 
                    : idx === labSetupStep 
                      ? 'text-gray-800 font-medium' 
                      : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current step content */}
        {currentLabStep && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-200 p-12">
            <h2 className="text-3xl font-light text-gray-800 mb-8">{currentLabStep.title}</h2>
            {currentLabStep.content}
          </div>
        )}
      </div>
    );
  };

  // Community Phase - where engineers connect
  const CommunityPhase = () => (
    <div className="space-y-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-200 p-12">
        <div className="text-center space-y-6 mb-12">
          <p className="text-3xl font-light text-gray-700">
            No engineer walks alone.
          </p>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            The path from warrior to builder is walked by many.
            <br />
            <span className="italic">Find your tribe. Share your scars. Build together.</span>
          </p>
        </div>

        <div className="space-y-10">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-10 rounded-3xl border border-amber-200">
            <h3 className="text-xl font-light text-amber-900 mb-6">The Contextus Collective</h3>
            <p className="text-amber-800 mb-6 leading-relaxed">
              You're part of something bigger now. Veterans becoming engineers.
              <br />
              Your struggles are our struggles. Your victories, our victories.
            </p>
            <a href="https://github.com/orionramey/contextus/discussions" target="_blank" rel="noopener noreferrer" 
               className="inline-flex items-center gap-2 text-amber-700 underline hover:text-amber-800">
              Join the Conversation <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-10 rounded-3xl border border-blue-200">
            <h3 className="text-xl font-light text-blue-900 mb-6">Thursday Gatherings</h3>
            <p className="text-blue-800 mb-6 leading-relaxed">
              Every Thursday at 1800 EST, we gather. No ranks. No hierarchy.
              <br />
              Just engineers helping engineers become.
            </p>
            <p className="text-blue-700 italic">
              "The magic happens when an E-4's question unlocks an O-5's problem."
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-3xl border border-green-200">
            <h3 className="text-xl font-light text-green-900 mb-6">Your First Contribution</h3>
            <p className="text-green-800 mb-6 leading-relaxed">
              Add your name to CONTRIBUTORS.md.
              <br />
              <span className="font-medium">This isn't just a commit. It's a declaration.</span>
            </p>
            <AnimatedTerminal 
              commands={[
                'git checkout -b add-my-name',
                'echo "- Your Name (@your-github)" >> CONTRIBUTORS.md',
                'git add CONTRIBUTORS.md',
                'git commit -m "feat: Another engineer joins the ranks"',
                'git push origin add-my-name'
              ]}
              output={`Switched to a new branch 'add-my-name'

[add-my-name 1a2b3c4] feat: Another engineer joins the ranks
 1 file changed, 1 insertion(+)

To https://github.com/YOUR_USERNAME/contextus.git
 * [new branch]      add-my-name -> add-my-name

Your first pull request awaits.
Your name joins the others.
You belong here.

Welcome home, engineer.`}
              id="contribute-terminal"
            />
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-10 rounded-3xl border border-purple-200">
            <h3 className="text-xl font-light text-purple-900 mb-6">The Teaching Tradition</h3>
            <p className="text-purple-800 leading-relaxed">
              Every problem you solve, document.
              <br />
              Every mistake you make, share.
              <br />
              Every lesson you learn, teach.
              <br /><br />
              <span className="font-medium">
                Your disaster today is someone's salvation tomorrow.
              </span>
            </p>
          </div>
        </div>

        <div className="mt-12 p-10 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl">
          <p className="text-2xl text-gray-800 font-light text-center leading-relaxed">
            From 35T to SRE. From maintainer to creator.
            <br />
            <span className="font-medium">
              This is The Way of Engineering.
            </span>
          </p>
          <p className="text-center text-gray-600 mt-6 italic">
            You don't walk it alone.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <button
            onClick={() => {
              setCurrentPhase(1);
              setDiscoveryStep(0);
              setUserPath(null);
              setCompletedChapters(new Set());
              setCompletedSteps({});
              setLabSetupStep(0);
              setOsType(null);
            }}
            className="px-10 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all font-light text-lg"
          >
            Begin Another Journey
          </button>
          
          <a href="https://github.com/orionramey/contextus" target="_blank" rel="noopener noreferrer" 
             className="text-gray-600 underline hover:text-gray-800 inline-flex items-center gap-2">
            Visit the Contextus Repository <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );

  // Welcome screen for first-time visitors
  const WelcomePhase = () => (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-3xl w-full space-y-12 text-center">
        <div className="space-y-6">
          <h1 className="text-6xl font-light text-gray-800">The Way of Engineering</h1>
          <p className="text-2xl text-gray-600 font-light">A Journey of Discovery</p>
        </div>
        
        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
          <p>
            For those who served and now seek to build.
          </p>
          <p>
            For those who maintained and now must create.
          </p>
          <p className="italic">
            For those ready to transform.
          </p>
        </div>

        <div className="pt-8">
          <button
            onClick={() => setCurrentPhase(1)}
            className="group px-12 py-5 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl font-light text-lg"
          >
            Begin
            <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-sm text-gray-500 pt-8">
          v13.3 • By Orion Ramey • For the 35T with fire in their blood
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {currentPhase === 0 ? (
        <WelcomePhase />
      ) : (
        <>
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-light text-gray-800">The Way of Engineering</h1>
                  <p className="text-gray-600 text-sm mt-1">A Journey of Discovery</p>
                </div>
                <p className="text-gray-500 text-sm">v13.3</p>
              </div>
            </div>
          </header>

          {/* Phase Navigation */}
          {currentPhase > 0 && (
            <div className="bg-gray-50 border-b border-gray-200 sticky top-[88px] z-40">
              <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex gap-8">
                  <button
                    onClick={() => setCurrentPhase(1)}
                    className={`pb-2 px-1 border-b-2 transition-colors font-light ${
                      currentPhase === 1 
                        ? 'border-gray-800 text-gray-800' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Discovery
                  </button>
                  <button
                    onClick={() => currentPhase >= 2 && setCurrentPhase(2)}
                    disabled={currentPhase < 2 && discoveryStep < 8}
                    className={`pb-2 px-1 border-b-2 transition-colors font-light ${
                      currentPhase === 2 
                        ? 'border-gray-800 text-gray-800' 
                        : currentPhase >= 2 || discoveryStep >= 8
                          ? 'border-transparent text-gray-500 hover:text-gray-700'
                          : 'border-transparent text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Laboratory
                  </button>
                  <button
                    onClick={() => currentPhase >= 3 && setCurrentPhase(3)}
                    disabled={currentPhase < 3}
                    className={`pb-2 px-1 border-b-2 transition-colors font-light ${
                      currentPhase === 3 
                        ? 'border-gray-800 text-gray-800' 
                        : currentPhase >= 3
                          ? 'border-transparent text-gray-500 hover:text-gray-700'
                          : 'border-transparent text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Community
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="max-w-6xl mx-auto px-6 py-12">
            {currentPhase === 1 ? (
              // Discovery Phase
              <div className="space-y-12">
                {/* Chapter Progress */}
                <div className="flex justify-center">
                  <div className="flex items-center space-x-3">
                    {discoveryChapters.map((chapter, i) => (
                      <button
                        key={i}
                        onClick={() => setDiscoveryStep(i)}
                        className={`transition-all ${
                          i === discoveryStep 
                            ? 'w-8 h-2 bg-gray-800 rounded-full' 
                            : i < discoveryStep
                              ? 'w-2 h-2 bg-gray-600 rounded-full'
                              : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                        }`}
                        aria-label={`Go to chapter ${i + 1}: ${chapter.title}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Chapter Header */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="text-5xl font-light text-gray-300">{currentChapter.number}</span>
                    <currentChapter.icon className="w-10 h-10 text-gray-600" />
                  </div>
                  <h2 className="text-4xl font-light text-gray-800 mb-4">{currentChapter.title}</h2>
                  <p className="text-xl text-gray-600 italic">{currentChapter.subtitle}</p>
                  {currentChapter.wisdom && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200 max-w-2xl mx-auto">
                      <p className="text-gray-700 italic text-lg">"{currentChapter.wisdom}"</p>
                    </div>
                  )}
                </div>

                {/* Chapter Content */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-sm p-12">
                  {currentChapter.content}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => discoveryStep > 0 && setDiscoveryStep(discoveryStep - 1)}
                    disabled={discoveryStep === 0}
                    className="px-8 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-light"
                  >
                    ← Previous
                  </button>
                  
                  <span className="text-gray-500 text-sm font-light">
                    Chapter {discoveryStep + 1} of {discoveryChapters.length}
                  </span>
                  
                  {discoveryStep < discoveryChapters.length - 1 && (
                    <button
                      onClick={() => setDiscoveryStep(discoveryStep + 1)}
                      className="px-8 py-3 text-gray-600 hover:text-gray-800 transition-all font-light"
                    >
                      Next →
                    </button>
                  )}
                </div>
              </div>
            ) : currentPhase === 2 ? (
              <LabPhase />
            ) : (
              <CommunityPhase />
            )}
          </main>

          {/* Footer */}
          <footer className="mt-32 py-12 border-t border-gray-200 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <p className="text-gray-600 mb-2">The Way of Engineering: A Journey of Discovery</p>
              <p className="text-gray-500 text-sm">Created by Orion Ramey • From 35T to Systems Engineer</p>
              <p className="text-gray-400 text-xs mt-4 italic">
                "Every master was once a disaster. Through failure, I found my thumos."
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default EngineeringJourney;
