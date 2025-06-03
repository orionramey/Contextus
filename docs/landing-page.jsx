import React, { useState, useEffect } from 'react';
import { ChevronRight, Terminal, Shield, Database, GitBranch, Heart, Compass, Package, Code, Layers, CheckCircle, Circle, ExternalLink, AlertCircle, Copy, Check, Download, ArrowDown, Award, Users, Settings, Monitor, Zap, FileText, ArrowRight, Coffee, Book, Wrench, Cpu, Cloud, Lock, Menu, X } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedCommands, setCopiedCommands] = useState({});

  // Mobile-responsive Animated Terminal Component
  const AnimatedTerminal = ({ commands, output, onComplete, id, enableCopy = true }) => {
    const [displayedCommands, setDisplayedCommands] = useState([]);
    const [displayedOutput, setDisplayedOutput] = useState('');
    const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isTypingCommand, setIsTypingCommand] = useState(true);
    const [isOutputComplete, setIsOutputComplete] = useState(false);
    
    // Type commands first
    useEffect(() => {
      if (!isTypingCommand) return;
      
      if (currentCommandIndex < commands.length) {
        const currentCommand = commands[currentCommandIndex];
        if (currentCharIndex < currentCommand.length) {
          const timer = setTimeout(() => {
            setDisplayedCommands(prev => {
              const newCommands = [...prev];
              if (!newCommands[currentCommandIndex]) {
                newCommands[currentCommandIndex] = '';
              }
              newCommands[currentCommandIndex] = currentCommand.substring(0, currentCharIndex + 1);
              return newCommands;
            });
            setCurrentCharIndex(currentCharIndex + 1);
          }, 50);
          return () => clearTimeout(timer);
        } else {
          // Move to next command
          if (currentCommandIndex < commands.length - 1) {
            setCurrentCommandIndex(currentCommandIndex + 1);
            setCurrentCharIndex(0);
          } else {
            // All commands typed, start output
            setIsTypingCommand(false);
          }
        }
      }
    }, [currentCommandIndex, currentCharIndex, commands, isTypingCommand]);

    // Type output after commands
    useEffect(() => {
      if (isTypingCommand || isOutputComplete) return;
      
      if (displayedOutput.length < output.length) {
        const timer = setTimeout(() => {
          setDisplayedOutput(output.substring(0, displayedOutput.length + 1));
        }, 20);
        return () => clearTimeout(timer);
      } else {
        setIsOutputComplete(true);
        if (onComplete && !terminalAnimationComplete[id]) {
          setTerminalAnimationComplete(prev => ({ ...prev, [id]: true }));
          onComplete();
        }
      }
    }, [displayedOutput, output, isTypingCommand, isOutputComplete, onComplete, id]);

    const handleCopyCommand = (cmd, index) => {
      navigator.clipboard.writeText(cmd);
      setCopiedCommands(prev => ({ ...prev, [id + '-' + index]: true }));
      setTimeout(() => {
        setCopiedCommands(prev => ({ ...prev, [id + '-' + index]: false }));
      }, 2000);
    };

    return (
      <div className="bg-gray-950 rounded-lg md:rounded-2xl p-4 md:p-8 font-mono text-xs md:text-sm shadow-2xl border border-gray-800 overflow-x-auto">
        {displayedCommands.map((cmd, idx) => (
          <div key={idx} className="mb-2 md:mb-3 text-gray-400 group flex items-center justify-between">
            <div className="flex-1">
              <span className="text-emerald-400">λ </span>
              <span className="text-gray-300">{cmd}</span>
              {isTypingCommand && currentCommandIndex === idx && currentCharIndex < commands[idx].length && 
                <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-1" />
              }
            </div>
            {enableCopy && cmd && (
              <button
                onClick={() => handleCopyCommand(commands[idx], idx)}
                className="opacity-0 group-hover:opacity-100 transition-opacity ml-4 p-1 hover:bg-gray-800 rounded"
                title="Copy command"
              >
                {copiedCommands[id + '-' + idx] ? 
                  <Check className="w-4 h-4 text-emerald-400" /> : 
                  <Copy className="w-4 h-4 text-gray-500" />
                }
              </button>
            )}
          </div>
        ))}
        {!isTypingCommand && (
          <div className="text-gray-300 whitespace-pre-wrap leading-relaxed mt-4 text-xs md:text-sm">
            {displayedOutput}
            {!isOutputComplete && <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-1" />}
          </div>
        )}
      </div>
    );
  };

  // Mobile navigation toggle
  const MobileMenuButton = () => (
    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-900 rounded-lg"
    >
      {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
    </button>
  );

  // Updated discovery chapters with improved content
  const discoveryChapters = [
    {
      id: 'awakening',
      number: '00',
      title: 'The Unbecoming',
      subtitle: 'You cannot build tomorrow with yesterday\'s tools',
      icon: Shield,
      content: (
        <div className="space-y-8 md:space-y-16 max-w-4xl mx-auto px-4 md:px-0">
          <div className="text-center space-y-4 md:space-y-6">
            <p className="text-2xl md:text-3xl font-light text-gray-700 leading-relaxed">
              Every master was once a disaster.
            </p>
            <div className="text-lg md:text-xl text-gray-600 leading-relaxed">
              <p className="mb-2">Through failure, I discovered <span className="font-medium text-emerald-700">thumos</span>:</p>
              <p className="text-base md:text-lg italic text-gray-500 mb-4">
                (Greek: θυμός) - The passionate spirit that follows deep curiosity.
                The force that transforms questions into code, problems into products.
              </p>
              <p className="font-medium">This is your invitation to discover yours.</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-gray-50 to-white p-6 md:p-12 rounded-2xl md:rounded-3xl border border-gray-200 shadow-sm">
            <p className="text-lg md:text-2xl text-gray-800 font-light text-center mb-6 md:mb-8">
              Military acronyms and evaluations—
              <br className="hidden md:block" />
              they served their purpose.
              <br />
              <span className="font-medium">Now build something that serves yours.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-lg md:text-xl font-light text-gray-800 flex items-center gap-3">
                <Terminal className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                What You Were
              </h3>
              <div className="space-y-3 md:space-y-4 text-gray-600 text-sm md:text-base">
                <p className="pl-6 md:pl-8 border-l-2 border-gray-200">
                  "I maintained systems"
                  <span className="block text-xs md:text-sm text-gray-500 mt-1">You kept the lights on</span>
                </p>
                <p className="pl-6 md:pl-8 border-l-2 border-gray-200">
                  "I followed SOPs"
                  <span className="block text-xs md:text-sm text-gray-500 mt-1">You executed plans</span>
                </p>
                <p className="pl-6 md:pl-8 border-l-2 border-gray-200">
                  "I supported the mission"
                  <span className="block text-xs md:text-sm text-gray-500 mt-1">You enabled others</span>
                </p>
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-lg md:text-xl font-light text-gray-800 flex items-center gap-3">
                <Code className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                What You're Becoming
              </h3>
              <div className="space-y-3 md:space-y-4 text-gray-600 text-sm md:text-base">
                <p className="pl-6 md:pl-8 border-l-2 border-emerald-200">
                  "I architect solutions"
                  <span className="block text-xs md:text-sm text-emerald-600 mt-1">You design the future</span>
                </p>
                <p className="pl-6 md:pl-8 border-l-2 border-emerald-200">
                  "I write the automation"
                  <span className="block text-xs md:text-sm text-emerald-600 mt-1">You create the systems</span>
                </p>
                <p className="pl-6 md:pl-8 border-l-2 border-emerald-200">
                  "I lead through code"
                  <span className="block text-xs md:text-sm text-emerald-600 mt-1">You empower everyone</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-20">
            <AnimatedTerminal 
              commands={[
                'whoami',
                'echo "Transforming..."',
                'git init my-new-life',
                'cd my-new-life && echo "# README" > README.md'
              ]}
              output={`veteran_systems_maintainer

Transforming...

Initialized empty Git repository in /home/you/my-new-life/.git/

Every repository starts empty.
Every expert started here.
Every system that runs the world began with someone typing 'git init'.

You are not your MOS.
You are not your clearance.
You are not your DD-214.

You are what you build next.`}
              id="awakening-terminal"
            />
          </div>

          <div className="bg-amber-50/50 p-6 md:p-10 rounded-2xl md:rounded-3xl border border-amber-200">
            <p className="text-base md:text-xl text-amber-800 font-light leading-relaxed">
              <span className="font-medium">Thumos</span> isn't motivation. It's deeper.
              <br />
              It's the passion that emerges after genuine curiosity.
              <br />
              <span className="font-medium">Find what fascinates you. The fire will follow.</span>
            </p>
          </div>

          <div className="text-center mt-8 md:mt-16">
            <button
              onClick={() => setDiscoveryStep(1)}
              className="group px-8 md:px-12 py-4 md:py-5 bg-gray-900 text-white rounded-xl md:rounded-2xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl font-light text-base md:text-lg"
            >
              I Am Ready to Begin
              <ArrowRight className="inline-block ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
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
      wisdom: 'One path maintains. The other creates.',
      content: (
        <div className="space-y-8 md:space-y-16 max-w-5xl mx-auto px-4 md:px-0">
          <div className="text-center space-y-4 md:space-y-6">
            <p className="text-2xl md:text-3xl font-light text-gray-700">
              Two paths. One choice. Your future.
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              The difference isn't skill—it's mindset.
              <br />
              <span className="italic mt-2 md:mt-4 block">Which engineer will you become?</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-16">
            <div 
              className={`relative bg-gray-50 p-6 md:p-10 rounded-2xl md:rounded-3xl cursor-pointer transition-all duration-500 ${
                hoveredPath === 'admin' ? 'transform scale-95 opacity-75' : ''
              }`}
              onClick={() => setHoveredPath(hoveredPath === 'admin' ? null : 'admin')}
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-300 text-4xl md:text-6xl font-light opacity-20">↓</div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <Settings className="w-8 h-8 md:w-10 md:h-10 text-gray-500" />
                  <h3 className="text-xl md:text-2xl font-light text-gray-700">Systems Administration</h3>
                </div>
                <p className="text-gray-600 mb-6 md:mb-8 italic text-sm md:text-base">
                  The path of maintenance
                </p>
                
                <div className="space-y-3 md:space-y-4 text-gray-600 text-sm md:text-base">
                  <p>Keep existing systems running</p>
                  <p>React to problems as they arise</p>
                  <p>Master yesterday's technology</p>
                  <p className="font-medium">Until AI does it better</p>
                </div>
              </div>
            </div>

            <div 
              className={`relative bg-gradient-to-br from-emerald-50 to-teal-50 p-6 md:p-10 rounded-2xl md:rounded-3xl cursor-pointer transition-all duration-500 ${
                hoveredPath === 'engineer' ? 'transform scale-105 shadow-2xl' : 'hover:scale-102'
              }`}
              onClick={() => setHoveredPath(hoveredPath === 'engineer' ? null : 'engineer')}
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-6 text-emerald-300 text-4xl md:text-6xl font-light opacity-30">↗</div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <Code className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
                  <h3 className="text-xl md:text-2xl font-light text-emerald-800">Systems Engineering</h3>
                </div>
                <p className="text-emerald-700 mb-6 md:mb-8 italic text-sm md:text-base">
                  The path of creation
                </p>
                
                <div className="space-y-3 md:space-y-4 text-emerald-700 text-sm md:text-base">
                  <p>Build tomorrow's solutions</p>
                  <p>Prevent problems before they exist</p>
                  <p>Create the technology</p>
                  <p className="font-medium">That others will maintain</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 md:mt-16">
            <button
              onClick={() => {
                setUserPath('engineer');
                setDiscoveryStep(2);
              }}
              className="group px-8 md:px-12 py-4 md:py-5 bg-emerald-700 text-white rounded-xl md:rounded-2xl hover:bg-emerald-800 transition-all transform hover:scale-105 shadow-xl font-light text-base md:text-lg"
            >
              I Choose to Create
              <ArrowRight className="inline-block ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'stack',
      number: '02', 
      title: 'Your Arsenal',
      subtitle: 'Production-grade tools for real engineering',
      icon: Layers,
      wisdom: 'Master the fundamentals, the rest follows',
      content: (
        <div className="space-y-8 md:space-y-16 max-w-4xl mx-auto px-4 md:px-0">
          <div className="text-center space-y-4 md:space-y-6">
            <p className="text-2xl md:text-3xl font-light text-gray-700">
              The Contextus Stack
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Not a tutorial. Not a toy.
              <br />
              <span className="font-medium">A complete monitoring laboratory.</span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-12 rounded-2xl md:rounded-3xl border border-gray-200">
            <h3 className="text-xl md:text-2xl font-light text-gray-800 mb-8 md:mb-10 text-center">
              Your Private Engineering Lab
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Database className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                  <h4 className="text-lg md:text-xl font-light">PostgreSQL</h4>
                </div>
                <p className="text-sm md:text-base text-gray-600">
                  Your data foundation. Track your learning journey, store configurations, power applications.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Monitor className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
                  <h4 className="text-lg md:text-xl font-light">Prometheus</h4>
                </div>
                <p className="text-sm md:text-base text-gray-600">
                  Collect metrics from everything. Learn PromQL, build alerts, understand observability.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Zap className="w-6 h-6 md:w-8 md:h-8 text-yellow-600" />
                  <h4 className="text-lg md:text-xl font-light">Grafana</h4>
                </div>
                <p className="text-sm md:text-base text-gray-600">
                  Transform data into insights. Build dashboards that tell stories, not just show numbers.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Package className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
                  <h4 className="text-lg md:text-xl font-light">Docker</h4>
                </div>
                <p className="text-sm md:text-base text-gray-600">
                  Everything runs in containers. Learn once, deploy anywhere. Your code, packaged and portable.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <GitBranch className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                  <h4 className="text-lg md:text-xl font-light">Git & GitHub</h4>
                </div>
                <p className="text-sm md:text-base text-gray-600">
                  Version control everything. Build your portfolio, collaborate, showcase your journey.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Code className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />
                  <h4 className="text-lg md:text-xl font-light">VS Code</h4>
                </div>
                <p className="text-sm md:text-base text-gray-600">
                  Your command center. Extensions for everything, integrated terminal, remote development.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12">
            <AnimatedTerminal 
              commands={[
                'git clone https://github.com/YOUR_USERNAME/contextus.git',
                'cd contextus',
                'docker-compose up -d',
                'open http://localhost:3000'
              ]}
              output={`Cloning into 'contextus'...
Receiving objects: 100% (42/42), done.

Creating network contextus_monitoring
Creating volume contextus_postgres_data
Creating volume contextus_prometheus_data
Creating volume contextus_grafana_data

✓ Container contextus-postgres    Started
✓ Container contextus-prometheus  Started  
✓ Container contextus-grafana     Started
✓ Container contextus-node-exporter Started

Your engineering lab is ready.
Grafana: http://localhost:3000 (admin/admin)
Prometheus: http://localhost:9090
PostgreSQL: localhost:5432 (postgres/mysecret)

Time to build.`}
              id="stack-terminal"
            />
          </div>

          <div className="bg-emerald-50 p-6 md:p-10 rounded-2xl md:rounded-3xl border border-emerald-200">
            <p className="text-base md:text-lg text-emerald-900 leading-relaxed">
              This isn't about learning tools.
              <br />
              It's about building with them.
              <br />
              <span className="font-medium">Your GitHub profile is your new resume.</span>
            </p>
          </div>

          <div className="text-center mt-8 md:mt-16">
            <button
              onClick={() => setDiscoveryStep(3)}
              className="group px-8 md:px-12 py-4 md:py-5 bg-gray-900 text-white rounded-xl md:rounded-2xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl font-light text-base md:text-lg"
            >
              Show Me the Lab Setup
              <ArrowRight className="inline-block ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'labsetup',
      number: '03',
      title: 'The Laboratory',
      subtitle: 'Where theory becomes practice',
      icon: Wrench,
      wisdom: 'Build in the open. Learn in public.',
      content: (
        <div className="space-y-8 md:space-y-16 max-w-4xl mx-auto px-4 md:px-0">
          {/* Lab Setup Steps */}
          <div className="space-y-6 md:space-y-8">
            <div className="text-center space-y-4">
              <p className="text-2xl md:text-3xl font-light text-gray-700">
                Your Private Engineering Laboratory
              </p>
              <p className="text-base md:text-lg text-gray-600">
                Four steps to transformation. One command at a time.
              </p>
            </div>

            {/* Step 1: GitHub */}
            <div className={`border rounded-xl md:rounded-2xl p-6 md:p-8 transition-all ${
              labSetupStep >= 1 ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {labSetupStep >= 1 ? (
                    <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
                  ) : (
                    <Circle className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-4">
                    Step 1: Create Your Engineering Identity
                  </h3>
                  <div className="space-y-4">
                    <p className="text-sm md:text-base text-gray-600">
                      Your GitHub profile is your new professional identity. Every commit tells your story.
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700">
                      <li>Visit <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">github.com</a></li>
                      <li>Create account with professional username</li>
                      <li>Add real name and professional photo</li>
                      <li>Write bio: "Veteran transitioning to DevOps/SRE"</li>
                    </ol>
                    {labSetupStep === 0 && (
                      <button
                        onClick={() => setLabSetupStep(1)}
                        className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm md:text-base"
                      >
                        I've Created My GitHub Account
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Fork Contextus */}
            {labSetupStep >= 1 && (
              <div className={`border rounded-xl md:rounded-2xl p-6 md:p-8 transition-all ${
                labSetupStep >= 2 ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {labSetupStep >= 2 ? (
                      <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
                    ) : (
                      <Circle className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-4">
                      Step 2: Fork Your Laboratory
                    </h3>
                    <div className="space-y-4">
                      <p className="text-sm md:text-base text-gray-600">
                        Fork the Contextus repository to create your own copy. This is where your journey begins.
                      </p>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-sm font-mono mb-2">Visit and fork:</p>
                        <a 
                          href="https://github.com/orionramey/Contextus" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:underline break-all text-sm md:text-base"
                        >
                          github.com/orionramey/Contextus
                        </a>
                      </div>
                      {labSetupStep === 1 && (
                        <button
                          onClick={() => setLabSetupStep(2)}
                          className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm md:text-base"
                        >
                          I've Forked Contextus
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Install Tools */}
            {labSetupStep >= 2 && (
              <div className={`border rounded-xl md:rounded-2xl p-6 md:p-8 transition-all ${
                labSetupStep >= 3 ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {labSetupStep >= 3 ? (
                      <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
                    ) : (
                      <Circle className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-4">
                      Step 3: Install Your Tools
                    </h3>
                    <div className="space-y-4">
                      <p className="text-sm md:text-base text-gray-600 mb-4">
                        Choose your operating system:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          onClick={() => setOsType('mac')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            osType === 'mac' 
                              ? 'border-emerald-500 bg-emerald-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Terminal className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2" />
                          <p className="font-medium text-sm md:text-base">macOS</p>
                        </button>
                        <button
                          onClick={() => setOsType('windows')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            osType === 'windows' 
                              ? 'border-emerald-500 bg-emerald-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Monitor className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2" />
                          <p className="font-medium text-sm md:text-base">Windows</p>
                        </button>
                      </div>
                      
                      {osType && (
                        <div className="mt-6 space-y-4">
                          {osType === 'mac' ? (
                            <div>
                              <h4 className="font-medium mb-3 text-sm md:text-base">Install with Homebrew:</h4>
                              <AnimatedTerminal
                                commands={[
                                  'brew install git',
                                  'brew install --cask docker',
                                  'open -a Docker'
                                ]}
                                output={`Installing Git...
✓ Git installed successfully

Installing Docker Desktop...
✓ Docker Desktop installed

Starting Docker Desktop...
✓ Docker is running

Ready to build!`}
                                id="mac-install"
                                enableCopy={true}
                              />
                            </div>
                          ) : (
                            <div>
                              <h4 className="font-medium mb-3 text-sm md:text-base">Windows Setup:</h4>
                              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                                <li>Install <a href="https://docs.microsoft.com/en-us/windows/wsl/install" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">WSL2</a></li>
                                <li>Install <a href="https://www.docker.com/products/docker-desktop" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Docker Desktop</a></li>
                                <li>Install <a href="https://git-scm.com/download/win" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Git for Windows</a></li>
                                <li>Restart your computer</li>
                              </ol>
                            </div>
                          )}
                          {labSetupStep === 2 && (
                            <button
                              onClick={() => setLabSetupStep(3)}
                              className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm md:text-base"
                            >
                              Tools Installed & Docker Running
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Deploy Your Lab */}
            {labSetupStep >= 3 && (
              <div className={`border rounded-xl md:rounded-2xl p-6 md:p-8 transition-all ${
                labSetupStep >= 4 ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {labSetupStep >= 4 ? (
                      <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
                    ) : (
                      <Circle className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-4">
                      Step 4: Launch Your Laboratory
                    </h3>
                    <div className="space-y-4">
                      <p className="text-sm md:text-base text-gray-600">
                        Time to bring your lab to life. Run these commands:
                      </p>
                      <AnimatedTerminal
                        commands={[
                          `git clone https://github.com/${gitHubUsername || 'YOUR_USERNAME'}/contextus.git`,
                          'cd contextus',
                          'docker-compose up -d'
                        ]}
                        output={`Cloning into 'contextus'...
remote: Counting objects: 100% (100/100), done.
Receiving objects: 100% (100/100), done.

Creating network contextus_monitoring
Creating volume contextus_postgres_data
Creating volume contextus_prometheus_data  
Creating volume contextus_grafana_data

✓ Container contextus-postgres       Started
✓ Container contextus-prometheus     Started
✓ Container contextus-grafana        Started
✓ Container contextus-node-exporter  Started
✓ Container contextus-postgres-exporter Started
✓ Container contextus-cadvisor       Started

🎉 Your engineering laboratory is live!

Access your services:
Grafana: http://localhost:3000 (admin/admin)
Prometheus: http://localhost:9090
PostgreSQL: localhost:5432 (postgres/mysecret)

Your journey begins now.`}
                        id="deploy-lab"
                        enableCopy={true}
                      />
                      
                      {labSetupStep === 3 && (
                        <div className="mt-6 space-y-4">
                          <input
                            type="text"
                            placeholder="Enter your GitHub username"
                            value={gitHubUsername}
                            onChange={(e) => setGitHubUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm md:text-base"
                          />
                          <button
                            onClick={() => setLabSetupStep(4)}
                            disabled={!gitHubUsername}
                            className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm md:text-base"
                          >
                            My Lab is Running!
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {labSetupStep >= 4 && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 md:p-10 rounded-2xl md:rounded-3xl border-2 border-emerald-300 text-center">
                <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl md:text-2xl font-medium text-gray-800 mb-2">
                  Congratulations, Engineer!
                </h3>
                <p className="text-base md:text-lg text-gray-600 mb-6">
                  Your laboratory is operational. Time to start building.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <a
                    href="http://localhost:3000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-medium text-sm md:text-base">Open Grafana</p>
                    <p className="text-xs md:text-sm text-gray-600">Start visualizing</p>
                  </a>
                  <a
                    href="http://localhost:9090"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <Monitor className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-medium text-sm md:text-base">Open Prometheus</p>
                    <p className="text-xs md:text-sm text-gray-600">Query metrics</p>
                  </a>
                  <a
                    href={`https://github.com/${gitHubUsername}/contextus`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <GitBranch className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-medium text-sm md:text-base">Your Repository</p>
                    <p className="text-xs md:text-sm text-gray-600">Start committing</p>
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-8 md:mt-16">
            <button
              onClick={() => setDiscoveryStep(4)}
              className="group px-8 md:px-12 py-4 md:py-5 bg-gray-900 text-white rounded-xl md:rounded-2xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl font-light text-base md:text-lg"
            >
              What's Next?
              <ArrowRight className="inline-block ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'journey',
      number: '04',
      title: 'The Journey',
      subtitle: 'From day one to first job',
      icon: Compass,
      wisdom: 'Consistency beats intensity',
      content: (
        <div className="space-y-8 md:space-y-16 max-w-4xl mx-auto px-4 md:px-0">
          <div className="text-center space-y-4">
            <p className="text-2xl md:text-3xl font-light text-gray-700">
              Your 90-Day Transformation
            </p>
            <p className="text-base md:text-lg text-gray-600">
              From "What's Docker?" to "I built that."
            </p>
          </div>

          {/* Learning Path Timeline */}
          <div className="space-y-6 md:space-y-8">
            {/* Month 1 */}
            <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl border border-gray-200">
              <h3 className="text-xl md:text-2xl font-light text-gray-800 mb-6">
                Month 1: Foundation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 text-sm md:text-base">Week 1-2: Docker & Git</h4>
                  <ul className="space-y-2 text-sm md:text-base text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Deploy Contextus stack daily</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Make first GitHub commits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Understand container basics</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 text-sm md:text-base">Week 3-4: Monitoring Basics</h4>
                  <ul className="space-y-2 text-sm md:text-base text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Write first PromQL queries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Create custom Grafana dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Set up basic alerts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Month 2 */}
            <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl border border-gray-200">
              <h3 className="text-xl md:text-2xl font-light text-gray-800 mb-6">
                Month 2: Building
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 text-sm md:text-base">Week 5-6: Real Projects</h4>
                  <ul className="space-y-2 text-sm md:text-base text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Build status dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Automate daily tasks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Document everything</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 text-sm md:text-base">Week 7-8: Advanced Topics</h4>
                  <ul className="space-y-2 text-sm md:text-base text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Custom exporters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>CI/CD pipeline basics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Infrastructure as Code</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Month 3 */}
            <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl border border-gray-200">
              <h3 className="text-xl md:text-2xl font-light text-gray-800 mb-6">
                Month 3: Professional
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 text-sm md:text-base">Week 9-10: Portfolio</h4>
                  <ul className="space-y-2 text-sm md:text-base text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Polish GitHub profile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Create project READMEs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Build LinkedIn presence</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 text-sm md:text-base">Week 11-12: Job Ready</h4>
                  <ul className="space-y-2 text-sm md:text-base text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Practice interviews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Network actively</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Apply strategically</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Routine */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-10 rounded-2xl md:rounded-3xl border border-blue-200">
            <h3 className="text-xl md:text-2xl font-light text-gray-800 mb-6 text-center">
              Your Daily Engineering Practice
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Coffee className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mx-auto mb-3" />
                <h4 className="font-medium text-gray-800 mb-2 text-sm md:text-base">Morning (30 min)</h4>
                <p className="text-sm md:text-base text-gray-600">Read docs, watch tutorial, plan tasks</p>
              </div>
              <div>
                <Code className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mx-auto mb-3" />
                <h4 className="font-medium text-gray-800 mb-2 text-sm md:text-base">Afternoon (2 hrs)</h4>
                <p className="text-sm md:text-base text-gray-600">Build something, break something, fix it</p>
              </div>
              <div>
                <GitBranch className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mx-auto mb-3" />
                <h4 className="font-medium text-gray-800 mb-2 text-sm md:text-base">Evening (30 min)</h4>
                <p className="text-sm md:text-base text-gray-600">Commit code, update notes, reflect</p>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 md:p-10 rounded-2xl md:rounded-3xl border border-purple-200">
            <div className="text-center">
              <Users className="w-12 h-12 md:w-16 md:h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-light text-gray-800 mb-4">
                You're Not Alone
              </h3>
              <p className="text-base md:text-lg text-gray-600 mb-6">
                Join the Contextus community. Every Thursday at 1800 EST.
              </p>
              <div className="space-y-3">
                <p className="text-sm md:text-base text-gray-700">
                  • Share your progress and struggles
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  • Get help when you're stuck
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  • Celebrate wins together
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 md:mt-16">
            <button
              onClick={() => setDiscoveryStep(5)}
              className="group px-8 md:px-12 py-4 md:py-5 bg-emerald-700 text-white rounded-xl md:rounded-2xl hover:bg-emerald-800 transition-all transform hover:scale-105 shadow-xl font-light text-base md:text-lg"
            >
              Complete Your Transformation
              <ArrowRight className="inline-block ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'transformation',
      number: '05',
      title: 'The Transformation',
      subtitle: 'Your engineering identity awaits',
      icon: Heart,
      wisdom: 'The best time was yesterday. The next best time is now.',
      content: (
        <div className="space-y-8 md:space-y-16 max-w-4xl mx-auto px-4 md:px-0">
          <div className="text-center space-y-4 md:space-y-6">
            <p className="text-2xl md:text-3xl font-light text-gray-700">
              From Veteran to Engineer
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Not just a career change. A complete transformation.
            </p>
          </div>

          {/* Transformation Timeline */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 md:p-10 rounded-2xl md:rounded-3xl">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-600 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0 text-sm md:text-base">1</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-2 text-base md:text-lg">Today: Start Building</h4>
                  <p className="text-sm md:text-base text-gray-600">Fork Contextus. Deploy your lab. Make your first commit.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-emerald-600 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0 text-sm md:text-base">2</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-2 text-base md:text-lg">30 Days: Portfolio Grows</h4>
                  <p className="text-sm md:text-base text-gray-600">Multiple projects. Daily commits. Real experience.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-emerald-600 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0 text-sm md:text-base">3</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-2 text-base md:text-lg">60 Days: Confidence Builds</h4>
                  <p className="text-sm md:text-base text-gray-600">Solving real problems. Helping others. Building reputation.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-emerald-600 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0 text-sm md:text-base">4</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-2 text-base md:text-lg">90 Days: Engineer</h4>
                  <p className="text-sm md:text-base text-gray-600">Interview ready. Portfolio complete. Future secured.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-light text-gray-800 text-center">
              Veterans Who Made It
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <p className="text-sm md:text-base text-gray-600 italic mb-4">
                  "From 11B Infantry to SRE at a Fortune 500. Contextus gave me hands-on experience when I had none."
                </p>
                <p className="text-sm font-medium text-gray-800">- Former Army, Now $120k+</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <p className="text-sm md:text-base text-gray-600 italic mb-4">
                  "Navy IT to DevOps Engineer. The projects I built became my portfolio. Hired in 75 days."
                </p>
                <p className="text-sm font-medium text-gray-800">- Former Navy, Remote Role</p>
              </div>
            </div>
          </div>

          {/* Your Engineering Identity */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 md:p-10 rounded-2xl md:rounded-3xl border-2 border-emerald-300">
            <h3 className="text-xl md:text-2xl font-medium text-gray-800 mb-6 text-center">
              Your New Engineering Identity
            </h3>
            <div className="space-y-4 text-sm md:text-base">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-700">GitHub profile with real projects</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-700">Monitoring stack expertise</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-700">Container orchestration skills</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-700">Infrastructure as Code experience</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-700">Community connections</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-700">Interview-ready portfolio</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6">
            <p className="text-xl md:text-2xl font-light text-gray-700">
              Your transformation starts with one command:
            </p>
            <AnimatedTerminal
              commands={[
                'git clone https://github.com/orionramey/Contextus.git'
              ]}
              output={`Cloning into 'Contextus'...

This isn't just code.
It's your future.

Start building.`}
              id="final-terminal"
              enableCopy={true}
            />
            
            <div className="pt-8 space-y-4">
              <a
                href="https://github.com/orionramey/Contextus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 md:px-12 py-4 md:py-5 bg-emerald-700 text-white rounded-xl md:rounded-2xl hover:bg-emerald-800 transition-all transform hover:scale-105 shadow-xl font-medium text-base md:text-lg"
              >
                Start Your Journey Now
                <ExternalLink className="inline-block ml-2 w-4 h-4 md:w-5 md:h-5" />
              </a>
              <p className="text-sm md:text-base text-gray-600">
                Join hundreds of veterans already transforming their lives
              </p>
            </div>
          </div>

          {/* Final Inspiration */}
          <div className="bg-gray-900 text-white p-6 md:p-10 rounded-2xl md:rounded-3xl text-center">
            <p className="text-lg md:text-2xl font-light leading-relaxed">
              You've served your country.
              <br />
              <span className="font-medium">Now serve your future.</span>
            </p>
            <p className="text-sm md:text-base text-gray-400 mt-4">
              Every line of code is a step forward. Every commit is progress.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <MobileMenuButton />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-transparent to-blue-50 opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-24">
          <div className="text-center space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 tracking-tight">
              The Way of
              <span className="block text-5xl md:text-7xl lg:text-8xl font-extralight text-emerald-600">
                Engineering
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-3xl mx-auto font-light">
              From military service to software engineering in 90 days
            </p>
            <div className="pt-8">
              <button
                onClick={() => setCurrentPhase(1)}
                className="group inline-flex items-center px-8 md:px-10 py-4 md:py-5 bg-gray-900 text-white rounded-xl md:rounded-2xl text-base md:text-lg font-light hover:bg-gray-800 transition-all transform hover:scale-105 shadow-2xl"
              >
                Begin Your Transformation
                <ArrowRight className="ml-2 md:ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Content */}
      {currentPhase === 1 && (
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          {/* Chapter Navigation */}
          <div className="mb-8 md:mb-12 overflow-x-auto pb-4">
            <div className="flex gap-3 md:gap-4 min-w-max">
              {discoveryChapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => setDiscoveryStep(index)}
                  className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl transition-all ${
                    discoveryStep === index
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <chapter.icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium text-sm md:text-base">{chapter.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Content */}
          <div className="animate-in fade-in duration-500">
            {discoveryChapters[discoveryStep].content}
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineeringJourney;